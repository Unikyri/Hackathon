package routes

import (
	"Hackathon/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

// SetupRoutes configura las rutas de la API
func SetupRoutes(app *fiber.App) {

<<<<<<< HEAD
=======
<<<<<<< HEAD
	// Ruta principal
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, world!")
	}) // Aquí cerramos correctamente la ruta principal

	// Registro y Login
=======
>>>>>>> frontendV2
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Esto es para probar que el servidor está funcionando",
		})
	})

	//Registro y Login
>>>>>>> 06d6ce5e6de26dcdcae6f98b2f435d72240dd8fa
	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)

<<<<<<< HEAD
	//Visualizacion de interfaz
	app.Get("/userMap", handlers.VisualizarUsuarios)
	app.Get("/profile", handlers.ObtenerInfoUsuario)
	app.Get("/user/favorites", handlers.ObtenerFavoritos)

	//Editar información del perfil
<<<<<<< HEAD
	app.Post("/user/:id/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/user/:id/changeDescription", handlers.ModificarDescripcion)
=======
	// Visualización de interfaz
	app.Get("/userVisualizer", handlers.VisualizarUsuarios)
	app.Get("/profileVisualizer", handlers.ObtenerInfoUsuario)
	app.Get("/favoriteVisualizer", handlers.ObtenerFavoritos)

	// Editar información del perfil
	app.Post("/profileEdition/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/profileEdition/changeDescription", handlers.ModificarDescripcion)
>>>>>>> frontendV2

	//Gestionar publicaciones
	app.Post("/postCreation", handlers.CrearPublicacion)
	app.Get("/postDelete", handlers.BorrarPublicacion)
<<<<<<< HEAD

	//Manejar los favoritos
	app.Post("/favorites/:id/:favorito_id", handlers.AgregarFavorito)
	app.Delete("/favorites/:id/:favorito_id", handlers.RemoverFavorito)
=======
>>>>>>> frontendV2
=======
	app.Post("/user/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/user/changeDescription", handlers.ModificarDescripcion)

	//Gestionar publicaciones
	app.Post("/user/postCreation", handlers.CrearPublicacion)
	app.Get("/user/postDelete", handlers.BorrarPublicacion)

	//Manejar los favoritos
	app.Post("/user/favorites/add", handlers.AgregarFavorito)
	app.Delete("/user/favorites/remove", handlers.RemoverFavorito)
>>>>>>> 47c519d9ab3d112a263eaa040ef9b0c823f81b60
}
