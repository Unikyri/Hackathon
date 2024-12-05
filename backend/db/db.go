package db

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"log"
)

var DB *sql.DB

func InitDB() {
	connStr := fmt.Sprintf(
		"host=192.168.140.128 port=5432 user=hackathon password=hack15243 dbname=reto2 sslmode=disable",
	)

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v\n", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatalf("Error al hacer ping a la base de datos: %v\n", err)
	}

	log.Println("Conexión a la base de datos exitosa")
}
