package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
)

// Register maneja el registro de usuarios.
func Register(c *fiber.Ctx) error {
	type RegisterRequest struct {
		Nombre      string  `json:"nombre"`
		Contrasenia string  `json:"contrasenia"`
		Longitud    float64 `json:"longitud"`
		Latitud     float64 `json:"latitud"`
		Correo      string  `json:"correo"`
		Telefono    string  `json:"telefono"`
		Rol         string  `json:"rol"`
		Foto        []byte  `json:"foto"`
		Descripcion string  `json:"descripcion"`
	}

	var req RegisterRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "datos inválidos",
		})
	}

	// Verifica si el usuario ya existe
	var existingUser models.Usuario
	if err := db.DB.Where("username = ?", req.Correo).First(&existingUser).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "el correo se ha ingresado anteriormente en el sistema",
		})
	}

	// Crea y guarda el nuevo usuario
	user := models.Usuario{
		Correo:      req.Correo,
		Contrasenia: req.Contrasenia,
		Longitud:    req.Longitud,
		Latitud:     req.Latitud,
		Nombre:      req.Nombre,
		Telefono:    req.Telefono,
		Rol:         req.Rol,
		Foto:        req.Foto,
		Descripcion: req.Descripcion,
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
