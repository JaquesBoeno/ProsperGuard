package core

import (
	"context"

	"github.com/JaquesBoeno/ProsperGuard/server/ent"
	"github.com/JaquesBoeno/ProsperGuard/server/internal/router"
	"github.com/expectedsh/go-sonic/sonic"
	"github.com/gofiber/fiber/v3"
)

type Server struct {
	DbClient      *ent.Client
	port          string
	SonicIngester sonic.Ingestable
	SonicSearch   sonic.Searchable
}

func (s Server) Start() {
	app := fiber.New(fiber.Config{
		CaseSensitive: false,
		StrictRouting: true,
		ServerHeader:  "Fiber",
		AppName:       "ProsperGuard",
	})

	router := router.Router{
		App:         app,
		DbClient:    s.DbClient,
		Ctx:         context.Background(),
		SonicIngest: s.SonicIngester,
		SonicSearch: s.SonicSearch,
	}

	router.Start()

	app.Listen(":" + s.port)
}
