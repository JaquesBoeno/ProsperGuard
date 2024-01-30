package core

import (
	"log"
	"os"
	"strconv"
)

func Start() {
	DbUrl := os.Getenv("DATABASE_URL")

	db := database{
		DatabaseURL: DbUrl,
	}

	DbClient := db.Start()

	sonicHost := os.Getenv("SONIC_HOST")
	sonicPortStr := os.Getenv("SONIC_PORT")
	sonicPassword := os.Getenv("SONIC_PASSWORD")

	sonicPort, err := strconv.ParseInt(sonicPortStr, 10, 32)

	if err != nil {
		log.Fatal(err)
	}

	sonic := Sonic{
		host:     sonicHost,
		port:     int(sonicPort),
		password: sonicPassword,
	}

	ingester, search := sonic.Start()

	port := os.Getenv("PORT")

	server := Server{
		DbClient:      DbClient,
		port:          port,
		SonicIngester: ingester,
		SonicSearch:   search,
	}

	server.Start()

	defer DbClient.Close()
}
