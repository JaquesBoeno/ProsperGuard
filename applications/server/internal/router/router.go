package router

import (
	"context"

	"github.com/JaquesBoeno/ProsperGuard/server/ent"
	"github.com/JaquesBoeno/ProsperGuard/server/internal/controller"
	"github.com/expectedsh/go-sonic/sonic"
	"github.com/gofiber/fiber/v3"
)

type Router struct {
	App         *fiber.App
	DbClient    *ent.Client
	SonicIngest sonic.Ingestable
	SonicSearch sonic.Searchable
	Ctx         context.Context
}

func (r Router) Start() {

	r.App.Get("/hello", func(c fiber.Ctx) error {
		return c.SendString("Hello!")
	})

	// Users
	userController := controller.UserController{
		DbClient: r.DbClient,
		Ctx:      r.Ctx,
	}

	r.App.Post("/user/create", userController.CreateUser)
	r.App.Get("/user/getAll", userController.GetAllUser)

	// Transactions
	transactionController := controller.TransactionController{
		DbClient:      r.DbClient,
		Ctx:           r.Ctx,
		SonicIngester: r.SonicIngest,
		SonicSearch:   r.SonicSearch,
	}
	r.App.Post("/transaction/create", transactionController.CreateTransaction)
	r.App.Get("/transaction/getFromUser", transactionController.GetAllTransactionsFromOneUser)
	r.App.Get("/transaction/suggest", transactionController.GetTransactionsSuggests)
}
