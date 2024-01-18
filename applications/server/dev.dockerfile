FROM golang:1.22rc1-alpine3.19 as base

WORKDIR /app

COPY . .

RUN go mod tidy
RUN go install github.com/cosmtrek/air@latest

ENTRYPOINT air