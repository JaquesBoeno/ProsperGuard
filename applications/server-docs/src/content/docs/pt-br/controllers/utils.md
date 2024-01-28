---
title: Pacote Utils
---

## Função hasEmptyFields

- Essa função recebe um array de `strings` que é o `requiredFields` e um `map` com os campos a serem verificados
- E nos retorna um boleano e uma string,caso o boleano seja verdadeiro será retornado o campo em questão e caso o boleano seja falso, no caso de não haver campos vazio, a string retornada será vazia.

```go
func hasEmptyFields(requiredFields []string, m map[string]string) (bool, string) {
	for _, field := range requiredFields {
		if m[field] == "" {
			return true, field
		}
	}
	return false, ""
}
```
