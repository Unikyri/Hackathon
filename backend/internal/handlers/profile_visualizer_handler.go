package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
)

// ObtenerInfoUsuario recibe el nombre de usuario como parámetro y retorna toda su información.
func ObtenerInfoUsuario(c *fiber.Ctx) error {
	// Parámetro de entrada: nombre del usuario
	usuarioNombre := c.Params("nombre") // Obtener el nombre de usuario desde la URL

	// Buscar el usuario por nombre
	var usuario models.Usuario
	if err := db.DB.Where("nombre = ?", usuarioNombre).First(&usuario).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Usuario no encontrado",
		})
	}

	// Buscar las calificaciones que ha recibido
	var calificaciones []models.Calificacion
	if err := db.DB.Where("reseniado_id = ?", usuario.ID).Find(&calificaciones).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al obtener las calificaciones",
		})
	}

	// Buscar los productos que está vendiendo
	var productos []models.Producto
	if err := db.DB.Where("usuario_id = ?", usuario.ID).Find(&productos).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al obtener los productos",
		})
	}

	// Buscar las publicaciones que ha realizado
	var publicaciones []models.Publicacion
	if err := db.DB.Where("usuario_id = ?", usuario.ID).Find(&publicaciones).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al obtener las publicaciones",
		})
	}

	// Responder con toda la información del usuario
	response := fiber.Map{
		"usuario": map[string]interface{}{
			"id":          usuario.ID,
			"nombre":      usuario.Nombre,
			"telefono":    usuario.Telefono,
			"foto":        usuario.Foto,
			"descripcion": usuario.Descripcion,
		},
		"calificaciones": calificaciones,
		"productos":      productos,
		"publicaciones":  publicaciones,
	}

	// Devolver la respuesta en formato JSON
	return c.JSON(response)
}
