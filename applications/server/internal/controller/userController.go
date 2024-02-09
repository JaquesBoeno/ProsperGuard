package controller

import (
	"context"
	"fmt"
	"github.com/JaquesBoeno/ProsperGuard/server/ent/user"
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

func (u *UserController) Login(c fiber.Ctx) error {
	requiredFields := []string{"email", "password"}
	params := c.Queries()
	if ok, field := hasEmptyFields(requiredFields, params); ok {
		return c.Status(fiber.StatusBadRequest).SendString(fmt.Sprintf("Provide a non-empty field: %s", field))
	}

	email, plainPassword := params["email"], params["password"]

	defaultRes := responses{
		c: c,
	}

	user, err := u.DbClient.User.Query().Where(user.Email(email)).Only(u.Ctx)

	if err != nil {
		return defaultRes.UsersNotExists()
	}

	if ok, err := security.VerifyHashedPassword(plainPassword, user.PasswordHash); ok && err == nil {
		// send token
		return c.SendStatus(fiber.StatusOK)
	}

	return defaultRes.FailOnAuth()
}
