package controller

import (
	"context"
	"strconv"
	"time"

	"github.com/JaquesBoeno/ProsperGuard/server/ent"
	"github.com/JaquesBoeno/ProsperGuard/server/ent/user"
)

// Return true if HAVE empty field
func hasEmptyFields(requiredFields []string, m map[string]string) (bool, string) {
	for _, field := range requiredFields {
		if m[field] == "" {
			return true, field
		}
	}
	return false, ""
}

// Return true if Type field is valid
func typeFieldIsValid(typeField string) bool {
	if typeField == "income" || typeField == "expense" {
		return true
	}

	return false
}

func userExists(DbClient *ent.Client, holder_id string, Ctx context.Context) (*ent.User, error) {
	user, err := DbClient.User.Query().Where(user.ID(holder_id)).Only(Ctx)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func parseToFloat(m map[string]string, fields []string) (map[string]float64, error) {
	results := make(map[string]float64, len(fields))

	for _, field := range fields {
		if m[field] != "" {
			value, err := strconv.ParseFloat(m[field], 64)
			results[field] = value
			if err != nil {
				return results, err
			}
		}
	}

	return results, nil
}

func parseToDate(m map[string]string, fields []string) (map[string]time.Time, error) {
	results := make(map[string]time.Time, len(fields))

	for _, field := range fields {
		if m[field] != "" {
			value, err := time.Parse(time.RFC3339, m[field])
			results[field] = value
			if err != nil {
				return results, err
			}
		}
	}

	return results, nil
}
