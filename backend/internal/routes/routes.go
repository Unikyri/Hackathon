package routes

import (
	"Hackathon/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

// SetupRoutes configura las rutas de la API
func SetupRoutes(app *fiber.App) {

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "¡Bienvenido a la API de Hackathon!",
		})
	})

	//Registro y Login
	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)

	//Visualizacion de interfaz
	app.Get("/userVisualizer", handlers.VisualizarUsuarios)
	app.Get("/profileVisualizer", handlers.ObtenerInfoUsuario)
	app.Get("/favoriteVisualizer", handlers.ObtenerFavoritos)

	//Editar información del perfil
	app.Post("/profileEdition/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/profileEdition/changeDescription", handlers.ModificarDescripcion)

	//Gestionar publicaciones
	app.Post("/postCreation", handlers.CrearPublicacion)
	app.Get("postDelete", handlers.BorrarPublicacion)
}
