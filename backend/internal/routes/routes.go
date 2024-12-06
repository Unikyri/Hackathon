package routes

import (
	"Hackathon/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

// SetupRoutes configura las rutas de la API
func SetupRoutes(app *fiber.App) {

	// Ruta principal
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, world!")
	}) // Aquí cerramos correctamente la ruta principal

	// Registro y Login
	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)

	// Visualización de interfaz
	app.Get("/userVisualizer", handlers.VisualizarUsuarios)
	app.Get("/profileVisualizer", handlers.ObtenerInfoUsuario)
	app.Get("/favoriteVisualizer", handlers.ObtenerFavoritos)

	// Editar información del perfil
	app.Post("/profileEdition/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/profileEdition/changeDescription", handlers.ModificarDescripcion)
}
