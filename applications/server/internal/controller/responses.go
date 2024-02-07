package controller

import (
	"github.com/gofiber/fiber/v3"
)

type responses struct {
	c fiber.Ctx
}

func (r *responses) UsersNotExists() error {
	return r.c.Status(fiber.StatusBadRequest).SendString("User not exists")
}
func (r *responses) FailOnAuth() error {
	return r.c.Status(fiber.StatusUnauthorized).SendString("Fail on authentication, incorrect email or password.")
}
