package controller

// Return true if HAVE empty field
func hasEmptyFields(requiredFields []string, m map[string]string) (bool, string) {
	for _, field := range requiredFields {
		if m[field] == "" {
			return true, field
		}
	}
	return false, ""
}
