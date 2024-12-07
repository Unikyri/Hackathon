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
	//Visualizacion de interfaz
	app.Get("/userMap", handlers.VisualizarUsuarios)
	app.Get("/profile", handlers.ObtenerInfoUsuario)
	app.Get("/user/favorites", handlers.ObtenerFavoritos)

	//Editar información del perfil

	app.Post("/user/:id/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/user/:id/changeDescription", handlers.ModificarDescripcion)

	//Gestionar publicaciones
	app.Post("/postCreation", handlers.CrearPublicacion)
	app.Get("/postDelete", handlers.BorrarPublicacion)

	//Manejar los favoritos
	app.Post("/favorites/:id/:favorito_id", handlers.AgregarFavorito)
	app.Delete("/favorites/:id/:favorito_id", handlers.RemoverFavorito)

	app.Post("/user/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/user/changeDescription", handlers.ModificarDescripcion)

	//Gestionar publicaciones
	app.Post("/user/postCreation", handlers.CrearPublicacion)
	app.Get("/user/postDelete", handlers.BorrarPublicacion)

	//Manejar los favoritos
	app.Post("/user/favorites/add", handlers.AgregarFavorito)
	app.Delete("/user/favorites/remove", handlers.RemoverFavorito)

}
