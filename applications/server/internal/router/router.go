package router

import (
	"context"

	"github.com/JaquesBoeno/ProsperGuard/server/ent"
	"github.com/JaquesBoeno/ProsperGuard/server/internal/controller"
	"github.com/gofiber/fiber/v3"
)

type Router struct {
	App      *fiber.App
	DbClient *ent.Client
}

func (r Router) Start() {

	r.App.Get("/hello", func(c fiber.Ctx) error {
		return c.SendString("Hello!")
	})

	userController := controller.UserController{
		DbClient: r.DbClient,
		Ctx:      context.Background(),
	}

	r.App.Post("/user/create", userController.CreateUser)
}
