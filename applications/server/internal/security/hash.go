package security

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"strconv"
	"strings"

	"golang.org/x/crypto/argon2"
)

type params struct {
	memory     uint32
	iterations uint32
	threads    uint8
	saltLength uint32
	keyLength  uint32
}

// Hash string Template
// $a=argon2ID$v=<version>$m=<memory>$i=<interactions>$t=<threads>$s=<salt>$h=<hash>

func HashPassword(pass string) string {
	p := &params{
		memory:     64 * 1024,
		iterations: 1,
		threads:    1,
		saltLength: 16,
		keyLength:  32,
	}

	salt, _ := generateSalt(int(p.saltLength))
	hash := argon2.IDKey([]byte(pass), salt, p.iterations, p.memory, p.threads, p.keyLength)

	hashBase64 := base64.RawStdEncoding.EncodeToString(hash)
	saltBase64 := base64.RawStdEncoding.EncodeToString(salt)

	formatString := fmt.Sprintf("$a=argon2ID$v=%d$m=%d$i=%d$t=%d$s=%s$h=%s",
		argon2.Version, p.memory, p.iterations, p.threads, saltBase64, hashBase64)

	return formatString
}

func VerifyHashedPassword(pass string, hashConcatenated string) (bool, error) {
	hashMap := make(map[string]string)
	sliced := strings.Split(hashConcatenated, "$")[1:]

	for _, e := range sliced {
		arg := strings.Split(e, "=")
		key, value := arg[0], arg[1]
		hashMap[key] = value
	}

	salt, err := base64.RawStdEncoding.Strict().DecodeString(hashMap["s"])
	hash, err := base64.RawStdEncoding.Strict().DecodeString(hashMap["h"])

	if err != nil {
		return false, err
	}

	interactions, _ := strconv.ParseUint(hashMap["i"], 10, 32)
	memory, _ := strconv.ParseUint(hashMap["m"], 10, 32)
	threads, _ := strconv.ParseUint(hashMap["t"], 10, 8)
	keyLength := uint32(len(hash))

	hashToVerify := argon2.IDKey([]byte(pass), salt, uint32(interactions), uint32(memory), uint8(threads), keyLength)

	b64HashToVerify := base64.RawStdEncoding.EncodeToString(hashToVerify)

	return b64HashToVerify == hashMap["h"], nil
}

func generateSalt(size int) ([]byte, error) {
	salt := make([]byte, size)

	_, err := rand.Read(salt)

	return salt, err
}
