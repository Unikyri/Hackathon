package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
)

// Register maneja el registro de usuarios.
func Register(c *fiber.Ctx) error {
	type RegisterRequest struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	var req RegisterRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "datos inválidos",
		})
	}

	// Verifica si el usuario ya existe
	var existingUser models.User
	if err := db.DB.Where("username = ?", req.Username).First(&existingUser).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "el usuario ya existe",
		})
	}

	// Crea y guarda el nuevo usuario
	user := models.User{
		Username: req.Username,
		Password: req.Password, // Contraseña en texto plano
	}
	if err := db.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "no se pudo registrar el usuario",
		})
	}

	return c.JSON(fiber.Map{
		"message": "usuario registrado exitosamente",
	})
}
