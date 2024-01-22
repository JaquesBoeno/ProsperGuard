package core

import (
	"github.com/JaquesBoeno/ProsperGuard/server/internal/router"
	"github.com/gofiber/fiber/v3"
)

func Start() {
	app := fiber.New(fiber.Config{
		CaseSensitive: false,
		StrictRouting: true,
		ServerHeader:  "Fiber",
		AppName:       "ProsperGuard",
	})

	router := router.Router{
		App: app,
	}

	router.Start()

	app.Listen(":3060")
}
