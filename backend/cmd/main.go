package main

import (
	"Hackathon/db"
	"log"
	"os"
	"os/exec"

	_ "github.com/lib/pq"
)

func main() {
	// Inicia la conexión a la base de datos
	db.InitDB()
	defer db.CerrarDB()

	// Ejecuta las migraciones
	if err := runMigrations(); err != nil {
		log.Fatalf("Error al ejecutar migraciones: %v\n", err)
	}

	log.Println("Servidor listo para iniciar...")
}

func runMigrations() error {
	migrationFile := "./db/migrations.sql"

	cmd := exec.Command("psql", "-U", "hackathon", "-d", "reto2", "-f", migrationFile)
	cmd.Env = append(os.Environ(), "PGPASSWORD=hack15243")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	return cmd.Run()
}
