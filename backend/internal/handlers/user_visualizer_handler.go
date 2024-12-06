package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
)

// VisualizarUsuarios busca los usuarios con el mismo rol que el usuario que realiza la consulta
// y devuelve la ubicación del usuario que realiza la consulta.
func VisualizarUsuarios(c *fiber.Ctx) error {
	// Parámetro de entrada: ID del usuario
	id := c.Params("id") // Obtener el ID del usuario desde la URL

	// Buscar al usuario por ID
	var usuario models.Usuario
	if err := db.DB.Where("id = ?", id).First(&usuario).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Usuario no encontrado",
		})
	}

	// Obtener usuarios con el mismo rol que el usuario que realiza la consulta
	var usuariosConRol []models.Usuario
	if err := db.DB.Where("rol = ?", usuario.Rol).Find(&usuariosConRol).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al obtener los usuarios",
		})
	}

	// Responder con los usuarios y la ubicación del usuario que hizo la solicitud
	response := fiber.Map{
		"ubicacion_usuario": map[string]float64{
			"latitud":  usuario.Latitud,
			"longitud": usuario.Longitud,
		},
		"usuarios": usuariosConRol,
	}

	// Devolver la respuesta
	return c.JSON(response)
}
