package core

import "os"

const defaultPort = "3070"

func Core() {
	dbURL := os.Getenv("DATABASE_URL")

	dbApp := Database{
		DatabaseURL: dbURL,
		Database:    "ProsperGuard",
	}

	dbClient := dbApp.Connect()

	port := os.Getenv("PORT")

	if port == "" {
		port = defaultPort
	}

	graphql := GQLServer{
		Port:     port,
		Database: dbClient,
	}

	graphql.Start()
}
