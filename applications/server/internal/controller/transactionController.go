package controller

import (
	"context"
	"fmt"
	"log"
	"strconv"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/JaquesBoeno/ProsperGuard/server/ent"
	"github.com/expectedsh/go-sonic/sonic"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type TransactionController struct {
	DbClient      *ent.Client
	Ctx           context.Context
	SonicIngester sonic.Ingestable
	SonicSearch   sonic.Searchable
}

func (t *TransactionController) CreateTransaction(c fiber.Ctx) error {
	m := c.Queries()
	requiredFields := []string{"type", "name", "description", "value", "date", "holder_id"}

	if ok, field := hasEmptyFields(requiredFields, m); ok {
		return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
	}

	if ok := typeFieldIsValid(m["type"]); !ok {
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on create the transaction, provide a valid 'type' (income OR expense)"))
	}

	if _, err := userExists(t.DbClient, m["holder_id"], t.Ctx); err != nil {
		log.Printf("TransactionController, CreateTransaction, verify user exists %v", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on create the transaction, user not exist."))
	}

	value, err := strconv.ParseFloat(m["value"], 64)
	if err != nil {
		log.Printf("TransactionController, CreateTransaction, format value: %v", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	date, err := time.Parse(time.RFC3339, m["date"])
	if err != nil {
		log.Printf("TransactionController, CreateTransaction, format date: %v", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}
	transaction, err := t.DbClient.Transaction.Create().
		SetID((uuid.New()).String()).
		SetType(m["type"]).
		SetName(m["name"]).
		SetDescription(m["description"]).
		SetValue(value).
		SetDate(date).
		SetHolderID(m["holder_id"]).
		Save(t.Ctx)

	if err != nil {
		log.Printf("TransactionController, CreateTransaction, insert in db: %v", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	text := fmt.Sprintf("%s %s", transaction.Name, transaction.Description)

	err = t.SonicIngester.Push("transactions", m["holder_id"], transaction.ID, text, "por")

	if err != nil {
		t.DbClient.Transaction.Delete().Where(func(s *sql.Selector) {
			s.Where(sql.InValues("id", transaction.ID))
		})
		log.Printf("TransactionController, CreateTransaction, insert in sonic: %v", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	return c.Status(fiber.StatusOK).JSON(transaction)
}

func (t *TransactionController) GetAllTransactionsFromOneUser(c fiber.Ctx) error {
	m := c.Queries()
	requiredFields := []string{"holder_id"}

	if ok, field := hasEmptyFields(requiredFields, m); ok {
		return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
	}

	user, err := userExists(t.DbClient, m["holder_id"], t.Ctx)

	if err != nil {
		log.Printf("TransactionController, GetAllTransactionsFromOneUser, verify user exists %v", err)
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on get transactions, user not exist."))
	}

	var typeFilter string = m["type"]
	if ok := typeFieldIsValid(typeFilter); typeFilter != "" && !ok {
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on create the transaction, provide a valid 'type' (income OR expense)"))
	}

	valueMap, err := parseToFloat(m, []string{"value_exact", "value_max", "value_min"})
	if err != nil {
		log.Printf("TransactionController, CreateTransaction, format value: %v", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	datesMap, err := parseToDate(m, []string{"date_start", "date_end", "date_exact"})
	if err != nil {
		log.Printf("TransactionController, CreateTransaction, format dates: %v", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	transactions, err := user.QueryTransactions().
		Where(func(s *sql.Selector) {
			if typeFilter != "" {
				s.Where(sql.InValues("type", typeFilter))
			}

			if valueMap["value_exact"] > 0 {
				s.Where(sql.EQ("value", valueMap["value_exact"]))
			} else if valueMap["value_min"] > 0 && valueMap["value_max"] > valueMap["value_min"] {
				s.Where(sql.And(sql.GTE("value", valueMap["value_min"]), sql.LTE("value", valueMap["value_max"])))
			} else if valueMap["value_min"] > 0 && valueMap["value_max"] <= valueMap["value_min"] {
				s.Where(sql.GTE("value", valueMap["value_min"]))
			} else if valueMap["value_min"] == 0 && valueMap["value_max"] > valueMap["value_min"] {
				s.Where(sql.LTE("value", valueMap["value_max"]))
			}

			if m["date_exact"] != "" {
				s.Where(sql.EQ("date", datesMap["date_exact"]))
			} else if m["date_start"] != "" && m["date_end"] == "" {
				s.Where(sql.GTE("date", datesMap["date_start"]))
			} else if m["date_end"] != "" && m["date_start"] == "" {
				s.Where(sql.LTE("date", datesMap["date_end"]))
			} else if m["date_end"] != "" && m["date_start"] != "" {
				s.Where(sql.And(sql.GTE("date", datesMap["date_start"]), sql.LTE("date", datesMap["date_end"])))
			}
		}).
		All(t.Ctx)

	if err != nil {
		log.Printf("TransactionController, GetAllTransactionsFromOneUser %v", err)
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on get transactions."))
	}

	return c.Status(fiber.StatusOK).JSON(transactions)
}

func (t *TransactionController) GetTransactionsSuggests(c fiber.Ctx) error {
	m := c.Queries()
	requiredFields := []string{"terms", "holder_id"}

	if ok, field := hasEmptyFields(requiredFields, m); ok {
		return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
	}

	results, err := t.SonicSearch.Suggest("transactions", m["holder_id"], m["terms"], 5)

	if err != nil {
		log.Printf("GetTransactionsSuggests, get suggests: %v", err)
	}

	return c.Status(fiber.StatusOK).JSON(results)
}
