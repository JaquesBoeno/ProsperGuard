// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type CreateNewUser struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Mutation struct {
}

type Query struct {
}

type Tag struct {
	ID    string `json:"id"`
	Label string `json:"label"`
	Color string `json:"color"`
}

type Transaction struct {
	ID          string   `json:"id"`
	Type        string   `json:"type"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	Value       float64  `json:"value"`
	Date        string   `json:"date"`
}

type User struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	Email        string `json:"email"`
	PasswordHash string `json:"passwordHash"`
}