package controller

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/JaquesBoeno/ProsperGuard/server/internal/crypto"
	"github.com/JaquesBoeno/ProsperGuard/server/internal/graph/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DIUsers struct {
	DBClient *mongo.Database
}

type UserBson struct {
	Name         string    `bson:"name"`
	Email        string    `bson:"email"`
	PasswordHash string    `bson:"passwordHash"`
	CreatedAt    time.Time `bson:"createdAt"`
	UpdatedAt    time.Time `bson:"updatedAt"`
}

func (d *DIUsers) CreateUser(name string, email string, plainPassword string) (*model.User, error) {
	strHash := crypto.HashPassword(plainPassword)

	newUser := UserBson{
		Name:         name,
		Email:        email,
		PasswordHash: strHash,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	result, err := d.DBClient.Collection("users").InsertOne(context.TODO(), newUser)

	id := fmt.Sprint(result.InsertedID)

	user := &model.User{
		ID:           id,
		Name:         name,
		Email:        email,
		PasswordHash: strHash,
		CreatedAt:    newUser.CreatedAt.GoString(),
		UpdatedAt:    newUser.UpdatedAt.GoString(),
	}

	return user, err
}

func (d *DIUsers) GetAllUser() ([]*model.User, error) {
	allUsers, err := d.DBClient.Collection("users").Find(context.TODO(), bson.D{{}}, options.Find().SetLimit(4))

	var allUserFormat []*model.User

	for allUsers.Next(context.TODO()) {
		//Create a value into which the single document can be decoded
		var elem struct {
			Name         string
			Email        string
			PasswordHash string
			CreatedAt    time.Time
			UpdatedAt    time.Time
		}
		err := allUsers.Decode(&elem)

		if err != nil {
			log.Print(err)
		}
		log.Print()

		mapElem := model.User{
			ID:           fmt.Sprint(allUsers.ID()),
			Name:         elem.Name,
			Email:        elem.Email,
			PasswordHash: elem.PasswordHash,
			CreatedAt:    elem.CreatedAt.GoString(),
			UpdatedAt:    elem.UpdatedAt.GoString(),
		}
		allUserFormat = append(allUserFormat, &mapElem)
	}

	return allUserFormat, err
}
