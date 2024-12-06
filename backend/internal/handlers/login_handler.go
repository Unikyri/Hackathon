package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
)

// Login maneja el inicio de sesión de usuarios.
func Login(c *fiber.Ctx) error {
	type LoginRequest struct {
		Correo      string `json:"correo"`
		Contrasenia string `json:"password"`
	}

	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "datos inválidos",
		})
	}

	// Busca al usuario por su username
	var user models.Usuario
	if err := db.DB.Where("correo = ? AND contrasenia = ?", req.Correo, req.Contrasenia).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "usuario o contraseña incorrectos",
		})
	}

	return c.JSON(fiber.Map{
		"message": "inicio de sesión exitoso",
		"user":    user.ID,
		"rol":     user.Rol,
	})
}
