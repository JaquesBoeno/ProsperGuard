package controller

import (
	"context"
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
	m := c.Queries()
	requiredFields := []string{"name", "email", "password"}

	if ok, field := hasEmptyFields(requiredFields, m); ok {
		return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
	}

	passwordHash := security.HashPassword(m["password"])

	user, err := u.DbClient.User.Create().
		SetID((uuid.New()).String()).
		SetName(m["name"]).
		SetEmail(m["email"]).
		SetPasswordHash(passwordHash).
		SetOtpSeed("").
		Save(u.Ctx)

	if err != nil {
		log.Printf("UserController, CreateUser: %v", err)
	}

	return c.Status(fiber.StatusOK).Send([]byte(user.ID))
}

func (u *UserController) GetAllUser(c fiber.Ctx) error {
	users, err := u.DbClient.User.Query().All(u.Ctx)

	if err != nil {
		log.Fatalf("UserController, GetAllUsers: %v", err)
	}

	return c.Status(fiber.StatusOK).JSON(users)
}
