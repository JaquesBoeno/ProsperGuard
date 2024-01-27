package core

import "os"

func Start() {
	DbUrl := os.Getenv("DATABASE_URL")
	port := os.Getenv("PORT")

	DbClient := Database(DbUrl)

	StartServer(DbClient, port)
}
