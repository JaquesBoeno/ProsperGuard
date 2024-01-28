---
title: Controlador das Transações
---

Aqui iremos documentar todas as funções dentro do pacote responsável por controlar as transações

## Função `CreateTransaction`

### Validação dos campos

#### Verificação se os campos não são nulos

O primeiro passo é verificar se todos os argumentos necessários foram enviados pelo usuários.
fazemos isso com o seguinte trecho de código:

```go
m := c.Queries()
requiredFields := []string{"type", "name", "description", "value", "date", "holder_id"}
for _, field := range requiredFields {
  if m[field] == "" {
    return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
  }
}
```

- Onde Passamos todos parâmetros enviados pelo usuário em map chamado `m` através da função `Queries()` que nos é fornecida pelo fiber

```go
m := c.Queries()
```

- Logo em seguida declaramos um slice com o nome de cada parâmetro necessário

```go
requiredFields := []string{"type", "name", "description", "value", "date", "holder_id"}
```

- Então fazemos uma verificação para saber se os parâmetros não são nulos através de um `for` no slice `requiredFields`, onde pegar o valor do campo atual, e capturamos o seu valor no map `m`. E em caso de ser nulo retornamos com um status de `BadRequest` solicitando que envie o campo em questão com algum valor.

```go
for _, field := range requiredFields {
  if m[field] == "" {
    return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
  }
}
```

#### Verificação de tipo

Agora precisamos identificar se valores como `type` e `holder_id` são validos, por exemplo se o usuário existe.

- Primeiro fazemos uma verificação se o parâmetro `type` se enquadra como "income" ou "expense" através de um if simples, e caso não seja retornamos um status `StatusBadRequest` solicitando que o usuário envie o parâmetro `type` nos tipos válidos.

```go
if m["type"] != "expense" && m["type"] != "income" {
  return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on create the transaction, provide a valid 'type' (income OR expense)"))
}
```

- Agora precisamos saber se o usuário existe, podemos fazer procurando ele no banco de dados através do id fornecido no parâmetro `holder_id`. Neste trecho de código caso o usuário exista o err é nil, logo o trecho de código dentro do if é ignorado, porém caso o usuário não existe nos retornamos um status falando que o usuário não existe.

```go
_, err := t.DbClient.User.Query().Where(user.ID(m["holder_id"])).Only(t.Ctx)
if err != nil {
  log.Println(fmt.Sprintf("TransactionController, CreateTransaction, verify user exists %v", err))
  return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on create the transaction, user not exist."))
}
```

### Convertendo dados

Precisamos converter dados como o `value` e `date` de string para `float` e `time` respectivamente.

- Primeiro convertemos o `value` através da função `parseFloat` do pacote `strconv`
- Se por algum motivo isso falhe nos fazemos um log com o erro e retornamos para o usuário um status `InternalServerError`

```go
value, err := strconv.ParseFloat(m["value"], 64)
if err != nil {
  log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format value: %v", err))
  return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
}
```

- Agora para converter a `date` usamos a função `Parse` do pacote `time`, nós precisamos que a data seja enviada no formato RFC3339 justamente por esta etapa.
- Se por algum motivo isso falhe nos fazemos um log com o erro e retornamos para o usuário um status `InternalServerError`

```go
date, err := time.Parse(time.RFC3339, m["date"])
if err != nil {
  log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format date: %v", err))
  return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
}
```

### Salvando no Banco de dados

fazemos isso através do seguinte código, com atenção para a sétima linha onde através da função `SetHolderID(m["holder_id"])` definimos o relacionamento entre a função e o usuário.

- E novamente caso ocorra algum erro nós retornarmos um `InternalServerError` para o usuário.
- Em caso de Sucesso retornamos status `OK` e a transação em formato JSON

```go {7}
transaction, err := t.DbClient.Transaction.Create().
  SetType(m["type"]).
  SetName(m["name"]).
  SetDescription(m["description"]).
  SetValue(value).
  SetDate(date).
  SetHolderID(m["holder_id"]).
  Save(t.Ctx)

  if err != nil {
		log.Println(fmt.Sprintf("TransactionController, CreateTransaction, insert in db: %v", err))
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	return c.Status(fiber.StatusOK).JSON(transaction)

```

### Função Completa

```go
func (t *TransactionController) CreateTransaction(c fiber.Ctx) error {
	m := c.Queries()
	requiredFields := []string{"type", "name", "description", "value", "date", "holder_id"}
	for _, field := range requiredFields {
		if m[field] == "" {
			return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
		}
	}

	if m["type"] != "expense" && m["type"] != "income" {
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on create the transaction, provide a valid 'type' (income OR expense)"))
	}

	_, err := t.DbClient.User.Query().Where(user.ID(m["holder_id"])).Only(t.Ctx)
	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, CreateTransaction, verify user exists %v", err))
		return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on create the transaction, user not exist."))
	}

	value, err := strconv.ParseFloat(m["value"], 64)
	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format value: %v", err))
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	date, err := time.Parse(time.RFC3339, m["date"])
	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, CreateTransaction, format date: %v", err))
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	transaction, err := t.DbClient.Transaction.Create().
		SetType(m["type"]).
		SetName(m["name"]).
		SetDescription(m["description"]).
		SetValue(value).
		SetDate(date).
		SetHolderID(m["holder_id"]).
		Save(t.Ctx)

	if err != nil {
		log.Println(fmt.Sprintf("TransactionController, CreateTransaction, insert in db: %v", err))
		return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on create the transaction"))
	}

	return c.Status(fiber.StatusOK).JSON(transaction)
}
```

## Função `GetAllTransactionsFromOneUser`

### Validação dos campos

#### Verificação de campos não nulos

Fazemos o mesmo processo da função anterior nesta etapa

```go
m := c.Queries()
requiredFields := []string{"holder_id"}
for _, field := range requiredFields {
  if m[field] == "" {
    return c.Status(fiber.StatusBadRequest).Send([]byte("provide a nonempty " + field))
  }
}
```

#### Verificação se o usuário existe

Fazemos o mesmo processo da função anterior nesta etapa

```go
user, err := t.DbClient.User.Query().Where(user.ID(m["holder_id"])).Only(t.Ctx)
if err != nil {
  log.Println(fmt.Sprintf("TransactionController, GetAllTransactionsFromOneUser, verify user exists %v", err))
  return c.Status(fiber.StatusBadRequest).Send([]byte("Failed on get transactions, user not exist."))
}
```

### Pegando as transações

Capturamos todas transações, e se ocorrer algum erro retornamos para o usuário um `InternalServerError`, caso contrário é retornado todas transações para o usuário

```go
transactions, err := user.QueryTransactions().All(t.Ctx)

if err != nil {
  log.Println(fmt.Sprintf("TransactionController, GetAllTransactionsFromOneUser %v", err))
  return c.Status(fiber.StatusInternalServerError).Send([]byte("Failed on get transactions."))
}

return c.Status(fiber.StatusOK).JSON(transactions)
```
