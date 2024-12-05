package db

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB configura la conexión a la base de datos usando GORM
func InitDB() {
	// Cadena de conexión
	connStr := fmt.Sprintf(
		"host=192.168.140.128 port=5432 user=hackathon password=hack15243 dbname=reto2 sslmode=disable",
	)

	// Intentar abrir la conexión usando GORM
	var err error
	DB, err = gorm.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v\n", err)
	}

	// Verificar la conexión
	if err = DB.DB().Ping(); err != nil {
		log.Fatalf("Error al hacer ping a la base de datos: %v\n", err)
	}

	log.Println("Conexión a la base de datos exitosa")
}

// CerrarDB cierra la conexión a la base de datos cuando ya no se necesite
func CerrarDB() {
	if err := DB.Close(); err != nil {
		log.Fatalf("Error al cerrar la base de datos: %v\n", err)
	}
}
