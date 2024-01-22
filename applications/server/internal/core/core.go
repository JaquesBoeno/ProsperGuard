package core

import (
	"os"

	"github.com/JaquesBoeno/ProsperGuard/server/internal/router"
	"github.com/gofiber/fiber/v3"
)

func Start() {
	port := os.Getenv("PORT")
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

	app.Listen(":" + port)
}
