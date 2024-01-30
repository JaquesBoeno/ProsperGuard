package core

import "github.com/expectedsh/go-sonic/sonic"

type Sonic struct {
	host     string
	port     int
	password string
}

func (s Sonic) Start() (sonic.Ingestable, sonic.Searchable) {
	ingester, err := sonic.NewIngester(s.host, s.port, s.password)

	if err != nil {
		panic(err)
	}

	search, err := sonic.NewSearch(s.host, s.port, s.password)

	if err != nil {
		panic(err)
	}

	return ingester, search
}
