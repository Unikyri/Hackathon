package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"

	"github.com/gofiber/fiber/v2"
)

// ObtenerInfoUsuario recibe el ID del usuario como parámetro y retorna toda su información,
// incluyendo las calificaciones y las publicaciones (filtradas por categoría si se pasa como parámetro).
func ObtenerInfoUsuario(c *fiber.Ctx) error {

	// Parámetro de entrada: ID del usuario
<<<<<<< HEAD
	usuarioID := c.Params("id") // Obtener el ID del usuario desde la URL
=======
	// Parámetro de entrada: nombre del usuario
	idUsuarioStr := c.Params("id") // Obtener el nombre de usuario desde la URL

	// Convertir el ID del usuario de string a uint
	usuarioID, err := strconv.ParseUint(idUsuarioStr, 10, 32) // Convertimos a uint
	if err != nil {
		log.Println("Error al convertir el ID de usuario:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "ID de usuario inválido",
		})
	}
>>>>>>> frontendV2
=======
	usuarioID := c.Query("id") // Obtener el ID del usuario desde la URL
>>>>>>> 47c519d9ab3d112a263eaa040ef9b0c823f81b60

	// Obtener el parámetro de categoría (opcional)
	categoria := c.Query("categoria") // Leer el parámetro de categoría desde la query string

	// Buscar el usuario por ID
	var usuario models.Usuario
	if err := db.DB.Where("id = ?", usuarioID).First(&usuario).Error; err != nil {
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

	// Filtrar las publicaciones por categoría si se ha proporcionado
	var publicaciones []models.Publicacion
	query := db.DB.Where("usuario_id = ?", usuario.ID) // Consulta inicial

	// Si se proporciona una categoría, agregar el filtro a la consulta
	if categoria != "" {
		query = query.Where("categoria = ?", categoria)
	}

	// Ejecutar la consulta para obtener las publicaciones (con o sin filtro)
	if err := query.Find(&publicaciones).Error; err != nil {
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
		"publicaciones":  publicaciones,
	}

	// Devolver la respuesta
	return c.JSON(response)
}
