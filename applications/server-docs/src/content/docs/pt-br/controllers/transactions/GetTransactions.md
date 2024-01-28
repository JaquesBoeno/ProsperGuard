---
title: Função GetTransactions
---

## Validação dos campos

### Verificação de campos não nulos

Utilizamos a função `hasEmptyField` para verificar se todos os parâmetros foram enviados

```go
m := c.Queries()
requiredFields := []string{"holder_id"}
if ok, field := hasEmptyFields(requiredFields, m); ok {
	return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
}
```

### Verificação se o usuário existe

Fazemos o mesmo processo da função anterior nesta etapa

```go
user, err := t.DbClient.User.Query().Where(user.ID(m["holder_id"])).Only(t.Ctx)
if err != nil {
  log.Println(fmt.Sprintf("TransactionController, GetAllTransactionsFromOneUser, verify user exists %v", err))
  return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on get transactions, user not exist."))
}
```

## Pegando as transações

Capturamos todas transações, e se ocorrer algum erro retornamos para o usuário um `InternalServerError`, caso contrário é retornado todas transações para o usuário

```go
transactions, err := user.QueryTransactions().All(t.Ctx)

if err != nil {
  log.Println(fmt.Sprintf("TransactionController, GetAllTransactionsFromOneUser %v", err))
  return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on get transactions."))
}

return c.Status(fiber.StatusOK).JSON(transactions)
```

## Função Completa

```go
func (t *TransactionController) GetAllTransactionsFromOneUser(c fiber.Ctx) error {
	m := c.Queries()
	requiredFields := []string{"holder_id"}

	if ok, field := hasEmptyFields(requiredFields, m); ok {
		return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
	}

	user, err := t.DbClient.User.Query().Where(user.ID(m["holder_id"])).Only(t.Ctx)
	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, GetAllTransactionsFromOneUser, verify user exists %v", err))
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on get transactions, user not exist."))
	}

	transactions, err := user.QueryTransactions().All(t.Ctx)

	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, GetAllTransactionsFromOneUser %v", err))
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on get transactions."))
	}

	return c.Status(fiber.StatusOK).JSON(transactions)
}
```
