package controller

import (
	"context"
	"fmt"
	"log"
	"strconv"
	"time"

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

	if m["type"] != "expense" && m["type"] != "income" {
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

	transactions, err := user.QueryTransactions().All(t.Ctx)

	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, GetAllTransactionsFromOneUser %v", err))
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on get transactions."))
	}

	return c.Status(fiber.StatusOK).JSON(transactions)
}
