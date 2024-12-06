package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
)

// VisualizarUsuarios busca los usuarios de un rol específico, sin restricciones geográficas
func VisualizarUsuarios(c *fiber.Ctx) error {
	// Parámetros de entrada: ID del usuario y su rol
	id := c.Params("id")   // Obtener el ID del usuario desde la URL
	rol := c.Params("rol") // Obtener el rol desde la URL

	// Buscar el usuario por ID
	var usuario models.Usuario
	if err := db.DB.Where("id = ?", id).First(&usuario).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Usuario no encontrado",
		})
	}

	// Verificar que el rol del usuario sea el esperado
	if usuario.Rol != rol {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error": "El rol del usuario no coincide con el proporcionado",
		})
	}

	// Buscar usuarios con el rol proporcionado (sin límite geográfico)
	var usuariosConRol []models.Usuario
	if err := db.DB.Where("rol = ?", rol).Find(&usuariosConRol).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al obtener los usuarios",
		})
	}

	// Devolver los usuarios encontrados en formato JSON
	return c.JSON(fiber.Map{
		"usuarios": usuariosConRol,
	})
}
