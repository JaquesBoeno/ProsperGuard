package core

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5"
)

func Database(DbURL string) *pgx.Conn {
	if DbURL == "" {
		log.Fatal("Provide a valid DATABASE_URL")
	}
	conn, err := pgx.Connect(context.Background(), DbURL)

	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close(context.Background())

	return conn
}
