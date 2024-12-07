package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
)

// ObtenerFavoritos recibe el ID de un usuario y retorna los ID, nombre y foto de los usuarios favoritos.
func ObtenerFavoritos(c *fiber.Ctx) error {
	// Parámetro de entrada: ID del usuario
	idUsuario := c.Query("id") // Obtener el ID del usuario desde la URL

	// Buscar los favoritos del usuario
	var favoritos []models.Favoritos
	if err := db.DB.Where("usuario_id = ?", idUsuario).Find(&favoritos).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al obtener los favoritos",
		})
	}

	// Crear un slice para almacenar la información de los usuarios favoritos
	var usuariosFavoritos []map[string]interface{}

	// Iterar sobre los favoritos y obtener los datos de cada usuario favorito
	for _, favorito := range favoritos {
		var usuarioFavorito models.Usuario
		if err := db.DB.Where("id = ?", favorito.UsuarioFavoritoID).First(&usuarioFavorito).Error; err != nil {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Usuario favorito no encontrado",
			})
		}

		// Agregar la información del usuario favorito
		usuariosFavoritos = append(usuariosFavoritos, map[string]interface{}{
			"id":     usuarioFavorito.ID,
			"nombre": usuarioFavorito.Nombre,
			"foto":   usuarioFavorito.Foto, // La foto se devuelve tal cual como en el modelo Usuario
		})
	}

	// Retornar la lista de usuarios favoritos
	return c.JSON(fiber.Map{
		"favoritos": usuariosFavoritos,
	})
}
