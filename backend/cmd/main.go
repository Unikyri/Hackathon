package main

import (
	"Hackathon/internal/routes"
	"github.com/gofiber/fiber/v2"
	"log"
)

func main() {
	app := fiber.New()

	// Registrar rutas
	routes.SetupRoutes(app)

	log.Println("🚀 Servidor corriendo en http://localhost:10000")
	log.Fatal(app.Listen(":10000"))
}
