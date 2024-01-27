package router

import (
	"github.com/JaquesBoeno/ProsperGuard/server/ent"
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
}
