package db

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB configura la conexión a la base de datos usando GORM v2
func InitDB() {
	// Cadena de conexión
	connStr := fmt.Sprintf(
		"host=34.51.10.74 port=5400 user=hackathon password=hack15243 dbname=reto2 sslmode=disable",
	)

	// Intentar abrir la conexión usando GORM v2
	var err error
	DB, err = gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error al conectar a la base de datos: %v\n", err)
	}

	// Verificar la conexión (se usa DB.Exec en lugar de DB.Ping en GORM v2)
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("Error al obtener el objeto DB: %v\n", err)
	}
	if err = sqlDB.Ping(); err != nil {
		log.Fatalf("Error al hacer ping a la base de datos: %v\n", err)
	}

	log.Println("Conexión a la base de datos exitosa")
}

// CerrarDB cierra la conexión a la base de datos cuando ya no se necesite
func CerrarDB() {
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("Error al obtener el objeto DB para cerrar: %v\n", err)
	}

	if err := sqlDB.Close(); err != nil {
		log.Fatalf("Error al cerrar la base de datos: %v\n", err)
	}
}
