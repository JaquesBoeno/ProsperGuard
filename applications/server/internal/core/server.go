package core

import (
	"github.com/JaquesBoeno/ProsperGuard/server/internal/router"
	"github.com/gofiber/fiber/v3"
	"github.com/jackc/pgx/v5"
)

func StartServer(DbClient *pgx.Conn, port string) {
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
