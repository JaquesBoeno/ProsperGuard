package core

import (
	"context"

	"github.com/JaquesBoeno/ProsperGuard/server/ent"
	"github.com/JaquesBoeno/ProsperGuard/server/internal/router"
	"github.com/gofiber/fiber/v3"
)

func StartServer(DbClient *ent.Client, port string) {
	app := fiber.New(fiber.Config{
		CaseSensitive: false,
		StrictRouting: true,
		ServerHeader:  "Fiber",
		AppName:       "ProsperGuard",
	})

	router := router.Router{
		App:      app,
		DbClient: DbClient,
		Ctx:      context.Background(),
	}

	router.Start()

	app.Listen(":" + port)
}
