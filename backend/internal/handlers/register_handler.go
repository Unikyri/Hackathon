package handlers

import (
	"Hackathon/db"
	"github.com/gofiber/fiber/v2"
)

// Register crea un nuevo usuario.
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

	// Hashea la contraseña
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "no se pudo procesar la contraseña",
		})
	}

	user := models.User{
		Username: req.Username,
		Password: string(hashedPassword),
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
