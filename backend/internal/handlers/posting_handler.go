package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"log"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

// CrearPublicacion maneja la creación de una nueva publicación para un usuario
func CrearPublicacion(c *fiber.Ctx) error {
	// Parámetro de entrada: ID del usuario en la URL
	idUsuarioStr := c.Query("id") // Obtener el ID del usuario como string desde la URL

	// Convertir el ID del usuario de string a uint
	idUsuario, err := strconv.ParseUint(idUsuarioStr, 10, 32) // Convertimos a uint
	if err != nil {
		log.Println("Error al convertir el ID de usuario:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "ID de usuario inválido",
		})
	}

	// Estructura para recibir el texto de la publicación
	type Request struct {
		Publicacion string `json:"publicacion"` // Texto de la publicación
		Categoria   string `json:"categoria"`
		Foto        []byte `json:"foto"`
	}

	// Parsear el cuerpo de la solicitud para obtener el texto de la publicación
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Datos inválidos",
		})
	}

	// Crear la nueva publicación
	publicacion := models.Publicacion{
		UsuarioID:   uint(idUsuario), // Usar el ID convertido a uint
		Publicacion: req.Publicacion,
		Fecha:       time.Now(), // Fecha actual
		Categoria:   req.Categoria,
		Foto:        req.Foto,
	}

	// Guardar la nueva publicación en la base de datos
	if err := db.DB.Create(&publicacion).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al guardar la publicación",
		})
	}

	// Retornar una respuesta de éxito
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":     "Publicación creada con éxito",
		"publicacion": publicacion,
	})
}

// BorrarPublicacion elimina una publicación según su ID
func BorrarPublicacion(c *fiber.Ctx) error {
	// Parámetro de entrada: ID de la publicación desde la URL
	idPublicacionStr := c.Query("id") // Obtener el ID de la publicación como string

	// Convertir el ID de la publicación de string a uint
	idPublicacion, err := strconv.ParseUint(idPublicacionStr, 10, 32) // Convertir el ID
	if err != nil {
		log.Println("Error al convertir el ID de la publicación:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "ID de publicación inválido",
		})
	}

	// Buscar la publicación en la base de datos
	var publicacion models.Publicacion
	if err := db.DB.First(&publicacion, uint(idPublicacion)).Error; err != nil {
		log.Println("Publicación no encontrada:", err)
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Publicación no encontrada",
		})
	}

	// Eliminar la publicación
	if err := db.DB.Delete(&publicacion).Error; err != nil {
		log.Println("Error al eliminar la publicación:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al eliminar la publicación",
		})
	}

	// Responder con éxito
	return c.JSON(fiber.Map{
		"message": "Publicación eliminada con éxito",
		"id":      idPublicacion,
	})
}
