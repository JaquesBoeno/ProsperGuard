package core

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	// "github.com/99designs/gqlgen/graphql/playground"
	"github.com/JaquesBoeno/ProsperGuard/server/graph"
	"go.mongodb.org/mongo-driver/mongo"
)

type GQLServer struct {
	Port     string
	Database *mongo.Database
}

func (g *GQLServer) Start() {
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{
		Resolvers: &graph.Resolver{DB: g.Database},
	}))

	// http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("🚀 server is startup")
	log.Printf("🚀 endpoint query: http://localhost:%s/query", g.Port)
	log.Fatal(http.ListenAndServe(":"+g.Port, nil))
}
