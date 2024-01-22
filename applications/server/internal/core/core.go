package core

import "os"

func Start() {
	DbURL := os.Getenv("DATABASE_URL")
	port := os.Getenv("PORT")

	DbClient := Database(DbURL)

	StartServer(DbClient, port)
}
