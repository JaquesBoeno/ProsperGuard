package core

import (
	"context"
	"database/sql"
	"log"

	"github.com/JaquesBoeno/ProsperGuard/server/ent"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	_ "github.com/jackc/pgx/v5/stdlib"
)

// Open new connection
func Open(databaseUrl string) (*ent.Client, error) {
	db, err := sql.Open("pgx", databaseUrl)

	// Create an ent.Driver from `db`.
	drv := entsql.OpenDB(dialect.Postgres, db)
	return ent.NewClient(ent.Driver(drv)), err
}

func Database(DbUrl string) *ent.Client {
	client, err := Open(DbUrl)

	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()

	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	return client
}
