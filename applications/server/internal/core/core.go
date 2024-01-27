package core

import "os"

func Start() {
	DbUrl := os.Getenv("DATABASE_URL")
	port := os.Getenv("PORT")

	db := database{
		DatabaseURL: DbUrl,
	}

	DbClient := db.Start()
	StartServer(DbClient, port)

	defer DbClient.Close()
}
