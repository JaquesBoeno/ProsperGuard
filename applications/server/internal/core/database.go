package core

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	DatabaseURL string
	Database    string
}

func (db *Database) Connect() *mongo.Database {
	url := db.DatabaseURL

	if url == "" {
		log.Fatal("You must provide a no empty databaseURL")
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(url))

	if err != nil {
		panic(err)
	}

	return client.Database(db.Database)
}
