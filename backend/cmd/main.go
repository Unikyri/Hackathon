package main

import (
	"Hackathon/db"
	"github.com/gofiber/fiber/v2" // Asumiendo que estás usando Fiber v2
	_ "github.com/lib/pq"
	"log"
	"os"
	"os/exec"
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

	// Inicializa el servidor Fiber
	app := fiber.New()

	// Configura las rutas
	app.Get("/", func(c *fiber.Ctx) error {

		return c.SendString("¡Probando si funciona la automatización (3)")


	// Inicia el servidor en la IP externa (0.0.0.0) y puerto 10000
	err := app.Listen(":10000") // Aquí puedes cambiar el puerto si es necesario
	if err != nil {
		log.Fatalf("Error al iniciar el servidor: %v\n", err)
	}
}

func runMigrations() error {
	migrationFile := "./db/migrations.sql"

	cmd := exec.Command("psql", "-U", "hackathon", "-d", "reto2", "-f", migrationFile)
	cmd.Env = append(os.Environ(), "PGPASSWORD=hack15243")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	return cmd.Run()
}
