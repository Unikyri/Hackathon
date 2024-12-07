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
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Usuario no encontrado",
		})
	}

	// Inicializar la consulta para obtener usuarios con el mismo rol que el usuario que realiza la consulta
	var usuariosConRol []models.Usuario
	query := db.DB.Where("rol = ?", usuario.Rol)

	// Si se proporciona una categoría, filtrar las publicaciones de los usuarios
	if categoria != "" {
		// Buscar usuarios cuyo rol sea el mismo y que tengan publicaciones con la categoría especificada
		query = query.Where("id IN (?)", db.DB.Model(&models.Publicacion{}).Select("usuario_id").Where("categoria = ?", categoria))
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

	// Devolver la respuesta
	return c.JSON(response)
}
