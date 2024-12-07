package routes

import (
	"Hackathon/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

// SetupRoutes configura las rutas de la API
func SetupRoutes(app *fiber.App) {

<<<<<<< HEAD
	// Ruta principal
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, world!")
	}) // Aquí cerramos correctamente la ruta principal

	// Registro y Login
=======
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "¡Bienvenido a la API de Hackathon!",
		})
	})

	//Registro y Login
>>>>>>> 06d6ce5e6de26dcdcae6f98b2f435d72240dd8fa
	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d481c28a991d206e966435a4a9be2d999384d7f1
	// Visualización de interfaz
	app.Get("/userVisualizer", handlers.VisualizarUsuarios)
	app.Get("/profileVisualizer", handlers.ObtenerInfoUsuario)
	app.Get("/favoriteVisualizer", handlers.ObtenerFavoritos)

	// Editar información del perfil
	app.Post("/profileEdition/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/profileEdition/changeDescription", handlers.ModificarDescripcion)
<<<<<<< HEAD
=======
	//Visualizacion de interfaz
	app.Get("/userMap/:id", handlers.VisualizarUsuarios)
	app.Get("/profile/:id", handlers.ObtenerInfoUsuario)
	app.Get("/user/:id/favorites", handlers.ObtenerFavoritos)

	//Editar información del perfil
	app.Post("/user/:id/changePicture", handlers.CambiarFotoUsuario)
	app.Post("/user/:id/changeDescription", handlers.ModificarDescripcion)
>>>>>>> frontend
=======
>>>>>>> d481c28a991d206e966435a4a9be2d999384d7f1

	//Gestionar publicaciones
	app.Post("/postCreation", handlers.CrearPublicacion)
	app.Get("/postDelete", handlers.BorrarPublicacion)
<<<<<<< HEAD

	//Manejar los favoritos
	app.Post("/favorites/:id/:favorito_id", handlers.AgregarFavorito)
	app.Delete("/favorites/:id/:favorito_id", handlers.RemoverFavorito)
=======
>>>>>>> d481c28a991d206e966435a4a9be2d999384d7f1
}
