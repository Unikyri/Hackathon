package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
)

// AgregarFavorito agrega un usuario a la lista de favoritos de otro usuario.
func AgregarFavorito(c *fiber.Ctx) error {
	// Parámetros de entrada: IDs del usuario y el favorito
	idUsuario := c.Params("id")           // El ID del usuario que agrega al favorito
	idFavorito := c.Params("favorito_id") // El ID del usuario que será agregado a favoritos

	// Buscar el usuario que realiza la acción
	var usuario models.Usuario
	if err := db.DB.Where("id = ?", idUsuario).First(&usuario).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Usuario no encontrado",
		})
	}

	// Verificar si el usuario favorito ya está agregado a los favoritos
	var favorito models.Favoritos
	if err := db.DB.Where("usuario_id = ? AND usuario_favorito_id = ?", idUsuario, idFavorito).First(&favorito).Error; err == nil {
		// El usuario ya es un favorito, no es necesario agregarlo nuevamente
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "El usuario ya está en tu lista de favoritos",
		})
	}

	// Crear la relación de favorito
	nuevoFavorito := models.Favoritos{
		UsuarioID:         usuario.ID,
		UsuarioFavoritoID: favorito.ID,
	}

	// Guardar la relación en la base de datos
	if err := db.DB.Create(&nuevoFavorito).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al agregar el usuario a favoritos",
		})
	}

	// Responder con éxito
	return c.JSON(fiber.Map{
		"message": "Usuario agregado a favoritos exitosamente",
	})
}

// RemoverFavorito elimina un usuario de la lista de favoritos de otro usuario.
func RemoverFavorito(c *fiber.Ctx) error {
	// Parámetros de entrada: IDs del usuario y el favorito
	idUsuario := c.Params("id")           // El ID del usuario que remueve el favorito
	idFavorito := c.Params("favorito_id") // El ID del usuario que será removido de favoritos

	// Buscar el usuario que realiza la acción
	var usuario models.Usuario
	if err := db.DB.Where("id = ?", idUsuario).First(&usuario).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Usuario no encontrado",
		})
	}

	// Buscar la relación de favorito en la base de datos
	var favorito models.Favoritos
	if err := db.DB.Where("usuario_id = ? AND usuario_favorito_id = ?", idUsuario, idFavorito).First(&favorito).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "El usuario no está en tu lista de favoritos",
		})
	}

	// Eliminar la relación de favorito
	if err := db.DB.Delete(&favorito).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al eliminar el favorito",
		})
	}

	// Responder con éxito
	return c.JSON(fiber.Map{
		"message": "Usuario removido de favoritos exitosamente",
	})
}
