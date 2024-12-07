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
	app.Get("/userMap", handlers.VisualizarUsuarios)
	app.Get("/profile", handlers.ObtenerInfoUsuario)
	app.Get("/user/favorites", handlers.ObtenerFavoritos)

	//Editar información del perfil
	app.Post("/user/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/user/changeDescription", handlers.ModificarDescripcion)

	//Gestionar publicaciones
	app.Post("/user/postCreation", handlers.CrearPublicacion)
	app.Get("/user/postDelete", handlers.BorrarPublicacion)

	//Manejar los favoritos
	app.Post("/user/favorites/add", handlers.AgregarFavorito)
	app.Delete("/user/favorites/remove", handlers.RemoverFavorito)
}
