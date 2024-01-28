package controller

import (
	"context"
	"fmt"
	"log"

	"github.com/JaquesBoeno/ProsperGuard/server/ent"
	"github.com/JaquesBoeno/ProsperGuard/server/internal/security"
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

type UserController struct {
	DbClient *ent.Client
	Ctx      context.Context
}

func (u *UserController) CreateUser(c fiber.Ctx) error {
	name := c.Query("name")
	email := c.Query("email")
	plainPassword := c.Query("password")

	log.Printf(c.Query("*"))

	if name == "" {
		return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty name"))
	}

	if email == "" {
		return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty email"))
	}

	if plainPassword == "" {
		return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty password"))
	}

	passwordHash := security.HashPassword(plainPassword)

	user, err := u.DbClient.User.Create().
		SetID((uuid.New()).String()).
		SetName(name).
		SetEmail(email).
		SetPasswordHash(passwordHash).
		SetOtpSeed("").
		Save(u.Ctx)

	if err != nil {
		log.Fatal(fmt.Printf("UserController, CreateUser: %v", err))
	}

	return c.Status(fiber.StatusOK).Send([]byte(user.ID))
}

func (u *UserController) GetAllUser(c fiber.Ctx) error {
	users, err := u.DbClient.User.Query().All(u.Ctx)

	if err != nil {
		log.Fatal(fmt.Sprintf("UserController, GetAllUsers: %v", err))
	}

	return c.Status(fiber.StatusOK).JSON(users)
}
