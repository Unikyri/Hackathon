package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"encoding/base64"
	"github.com/gofiber/fiber/v2"
)

// CambiarFotoUsuario recibe el ID del usuario y una nueva foto en Base64, y la actualiza en la base de datos.
// Si no se proporciona una foto, la elimina (pone la foto como NULL).
func CambiarFotoUsuario(c *fiber.Ctx) error {
	// Parámetro de entrada: ID del usuario
	id := c.Params("id") // Obtener el ID del usuario desde la URL

	// Estructura para recibir el cuerpo de la solicitud (Base64 de la foto)
	type Request struct {
		FotoBase64 *string `json:"foto"` // Foto en Base64, ahora es un puntero a string
	}

	// Parsear el cuerpo de la solicitud
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Datos inválidos",
		})
	}

	// Si no se proporciona una foto, se elimina la foto (se pone como NULL)
	if req.FotoBase64 == nil || *req.FotoBase64 == "" {
		// Actualiza la foto a NULL en la base de datos
		if err := db.DB.Model(&models.Usuario{}).Where("id = ?", id).Update("foto", nil).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error al eliminar la foto del usuario",
			})
		}
		return c.JSON(fiber.Map{
			"message": "Foto eliminada exitosamente",
		})
	}

	// Decodificar la foto de Base64
	decodedFoto, err := base64.StdEncoding.DecodeString(*req.FotoBase64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Error al decodificar la foto",
		})
	}

	// Buscar el usuario por ID
	var usuario models.Usuario
	if err := db.DB.Where("id = ?", id).First(&usuario).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Usuario no encontrado",
		})
	}

	// Actualizar la foto del usuario en la base de datos
	if err := db.DB.Model(&usuario).Update("foto", decodedFoto).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al actualizar la foto",
		})
	}

	// Responder con éxito
	return c.JSON(fiber.Map{
		"message": "Foto actualizada exitosamente",
	})
}

// ModificarDescripcion recibe el ID de un usuario y la nueva descripción para actualizarla en la base de datos.
func ModificarDescripcion(c *fiber.Ctx) error {
	// Parámetro de entrada: ID del usuario
	id := c.Params("id") // Obtener el ID del usuario desde la URL

	// Estructura para recibir la nueva descripción
	type Request struct {
		Descripcion string `json:"descripcion"` // Nueva descripción
	}

	// Parsear el cuerpo de la solicitud
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Datos inválidos",
		})
	}

	// Buscar el usuario por ID
	var usuario models.Usuario
	if err := db.DB.Where("id = ?", id).First(&usuario).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Usuario no encontrado",
		})
	}

	// Actualizar la descripción del usuario (puede ser vacía)
	usuario.Descripcion = req.Descripcion

	// Guardar los cambios en la base de datos
	if err := db.DB.Save(&usuario).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al guardar la descripción",
		})
	}

	// Responder con el usuario actualizado
	return c.JSON(fiber.Map{
		"mensaje":     "Descripción actualizada correctamente",
		"usuario":     usuario,
		"descripcion": usuario.Descripcion,
	})
}
