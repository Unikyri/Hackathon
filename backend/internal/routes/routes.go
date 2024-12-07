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
	app.Get("/userMap/:id", handlers.VisualizarUsuarios)
	app.Get("/profile/:id", handlers.ObtenerInfoUsuario)
	app.Get("/user/:id/favorites", handlers.ObtenerFavoritos)

	//Editar información del perfil
	app.Post("/user/:id/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/user/:id/changeDescription", handlers.ModificarDescripcion)

	//Gestionar publicaciones
	app.Post("/postCreation", handlers.CrearPublicacion)
	app.Get("/postDelete", handlers.BorrarPublicacion)

	//Manejar los favoritos
	app.Post("/favorites/:id/:favorito_id", handlers.AgregarFavorito)
	app.Delete("/favorites/:id/:favorito_id", handlers.RemoverFavorito)
}
