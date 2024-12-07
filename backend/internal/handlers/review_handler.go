package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
	"log"
)

// CrearCalificacion maneja la creación de una calificación de un usuario hacia otro.
func CrearCalificacion(c *fiber.Ctx) error {
	// Estructura para recibir la calificación
	type Request struct {
		Puntuacion   int    `json:"puntuacion"`    // Puntuación entre 1 y 5
		Resenia      string `json:"resenia"`       // Reseña escrita por el reseniador
		ReseniadorID uint   `json:"reseniador_id"` // ID del usuario que hace la reseña
		ReseniadoID  uint   `json:"reseniado_id"`  // ID del usuario que recibe la reseña
	}

	// Parsear el cuerpo de la solicitud
	var req Request
	if err := c.BodyParser(&req); err != nil {
		log.Println("Error al parsear los datos:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Datos inválidos",
		})
	}

	// Validar la puntuación
	if req.Puntuacion < 1 || req.Puntuacion > 5 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "La puntuación debe estar entre 1 y 5",
		})
	}

	// Validar que la reseña no esté vacía
	if req.Resenia == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "La reseña no puede estar vacía",
		})
	}

	// Crear una nueva calificación
	calificacion := models.Calificacion{
		Puntuacion:   req.Puntuacion,
		Resenia:      req.Resenia,
		ReseniadorID: req.ReseniadorID,
		ReseniadoID:  req.ReseniadoID,
	}

	// Guardar la calificación en la base de datos
	if err := db.DB.Create(&calificacion).Error; err != nil {
		log.Println("Error al guardar la calificación:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al guardar la calificación",
		})
	}

	// Responder con un mensaje de éxito
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Calificación creada exitosamente",
		"calificacion": map[string]interface{}{
			"puntuacion": calificacion.Puntuacion,
			"resenia":    calificacion.Resenia,
			"reseniador": calificacion.ReseniadorID,
			"reseniado":  calificacion.ReseniadoID,
		},
	})
}
