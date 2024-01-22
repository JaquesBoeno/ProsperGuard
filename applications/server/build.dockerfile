FROM golang:1.22rc1-alpine3.19 as build

WORKDIR /app

COPY . .

RUN go mod tidy

RUN go build -o /server ./cmd/api/

FROM gcr.io/distroless/static-debian12 as prod

WORKDIR /

COPY --from=build /server /server

USER nonroot:nonroot

ENTRYPOINT [ "/server" ]