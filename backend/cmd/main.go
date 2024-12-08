package main

import (
	"Hackathon/db"
	"Hackathon/internal/routes" // Importa el paquete donde tienes las rutas
	"log"
	"os"
	"os/exec"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/lib/pq"
)

func main() {
	// Inicia la conexión a la base de datos
	db.InitDB()
	defer db.CerrarDB()

	// Habilita CORS
	// Ejecuta las migraciones
	if err := runMigrations(); err != nil {
		log.Fatalf("Error al ejecutar migraciones: %v\n", err)
	}

	log.Println("Servidor listo para iniciar y desplegado...")

	// Inicializa el servidor Fiber
	app := fiber.New()
	// Habilita CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Permite todas las orígenes
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS", // Métodos HTTP permitidos
	}))
	// Configura las rutas
	routes.SetupRoutes(app) // Llama a la función que configura las rutas

	// Ruta del certificado TLS
	certPath := "/etc/letsencrypt/live/backend.meaeting.tech/fullchain.pem"
	keyPath := "/etc/letsencrypt/live/backend.meaeting.tech/privkey.pem"

	// Inicia el servidor en el puerto 10000 con TLS
	err := app.ListenTLS(":10000", certPath, keyPath) // Aquí especificamos el puerto 10000
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
