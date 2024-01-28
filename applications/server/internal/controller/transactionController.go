package controller

import (
	"context"
	"fmt"
	"log"
	"strconv"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/JaquesBoeno/ProsperGuard/server/ent"
	"github.com/JaquesBoeno/ProsperGuard/server/ent/user"
	"github.com/gofiber/fiber/v3"
)

type TransactionController struct {
	DbClient *ent.Client
	Ctx      context.Context
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

	_, err := t.DbClient.User.Query().Where(user.ID(m["holder_id"])).Only(t.Ctx)
	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, CreateTransaction, verify user exists %v", err))
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on create the transaction, user not exist."))
	}

	value, err := strconv.ParseFloat(m["value"], 64)
	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format value: %v", err))
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	date, err := time.Parse(time.RFC3339, m["date"])
	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format date: %v", err))
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	transaction, err := t.DbClient.Transaction.Create().
		SetType(m["type"]).
		SetName(m["name"]).
		SetDescription(m["description"]).
		SetValue(value).
		SetDate(date).
		SetHolderID(m["holder_id"]).
		Save(t.Ctx)

	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, CreateTransaction, insert in db: %v", err))
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

	user, err := t.DbClient.User.Query().Where(user.ID(m["holder_id"])).Only(t.Ctx)
	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, GetAllTransactionsFromOneUser, verify user exists %v", err))
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on get transactions, user not exist."))
	}

	var typeFilter string = m["type"]
	if ok := typeFieldIsValid(typeFilter); typeFilter != "" && !ok {
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on create the transaction, provide a valid 'type' (income OR expense)"))
	}
	var value_min float64 = 0
	var value_max float64 = 0
	var value_exact float64 = 0

	if m["value_min"] != "" {
		value_min, err = strconv.ParseFloat(m["value_min"], 64)
		if err != nil {
			log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format value: %v", err))
			return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
		}
	}

	if m["value_max"] != "" {
		value_max, err = strconv.ParseFloat(m["value_max"], 64)
		if err != nil {
			log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format value: %v", err))
			return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
		}
	}

	if m["value_exact"] != "" {
		value_exact, err = strconv.ParseFloat(m["value_exact"], 64)
		if err != nil {
			log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format value: %v", err))
			return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
		}
	}

	var date_start time.Time
	// var date_end time.Time
	// var date_exact time.Time

	if m["date_start"] != "" {
		date_start, err = time.Parse(time.RFC3339, m["date_start"])
		if err != nil {
			log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format value: %v", err))
			return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
		}
	}

	transactions, err := user.QueryTransactions().
		Where(func(s *sql.Selector) {
			if typeFilter != "" {
				s.Where(sql.InValues("type", typeFilter))
			}

			if value_exact > 0 {
				s.Where(sql.EQ("value", value_exact))
			} else if value_min > 0 && value_max > value_min {
				s.Where(sql.And(sql.GTE("value", value_min), sql.LTE("value", value_max)))
			} else if value_min > 0 && value_max <= value_min {
				s.Where(sql.GTE("value", value_min))
			} else if value_min == 0 && value_max > value_min {
				s.Where(sql.LTE("value", value_max))
			}

			if m["date_start"] != "" {
				s.Where(sql.GTE("date", date_start))
			}
		}).
		All(t.Ctx)

	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, GetAllTransactionsFromOneUser %v", err))
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on get transactions."))
	}

	return c.Status(fiber.StatusOK).JSON(transactions)
}
