package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
)

func VisualizarUsuarios(c *fiber.Ctx) error {
	// Parámetro de entrada: ID del usuario
	id := c.Query("id") // Obtener el ID del usuario desde la URL

	// Obtener el parámetro de categoría (opcional)
	categoria := c.Query("categoria") // Leer el parámetro de categoría desde la query string

	// Buscar al usuario por ID
	var usuario models.Usuario
	if err := db.DB.Where("id = ?", id).First(&usuario).Error; err != nil {
		// Si no se encuentra el usuario, devolver un mensaje adecuado
		if err.Error() == "record not found" {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Usuario no encontrado",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al buscar el usuario",
		})
	}

	// Inicializar la consulta para obtener usuarios
	var usuariosConRol []models.Usuario
	query := db.DB

	// Si el usuario es un administrador, puede ver a todos los usuarios
	if usuario.Rol == "administrador" {
		// Si se proporciona una categoría, filtrar las publicaciones de los usuarios
		query = query.Where("rol != ?", "administrador")
		if categoria != "" {
			query = query.Where("id IN (?)", db.DB.Model(&models.Publicacion{}).Select("usuario_id").Where("categoria = ?", categoria))
		}
	} else {
		// Si el usuario no es administrador, no debe ver usuarios con el mismo rol ni administradores
		query = query.Where("rol != ? AND rol != ?", usuario.Rol, "administrador")
		// Si se proporciona una categoría, filtrar las publicaciones de los usuarios
		if categoria != "" {
			query = query.Where("id IN (?)", db.DB.Model(&models.Publicacion{}).Select("usuario_id").Where("categoria = ?", categoria))
		}
	}

	// Ejecutar la consulta para obtener los usuarios
	if err := query.Find(&usuariosConRol).Error; err != nil {
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

	// Retornar la respuesta
	return c.JSON(response)
}
