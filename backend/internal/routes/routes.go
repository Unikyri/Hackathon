package routes

import (
	"Hackathon/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

// SetupRoutes configura las rutas de la API
func SetupRoutes(app *fiber.App) {
	app.Post("/register", handlers.Register) // Ruta para registrar usuarios
	app.Post("/login", handlers.Login)       // Ruta para iniciar sesión

}
