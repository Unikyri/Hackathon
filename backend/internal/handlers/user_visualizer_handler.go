package handlers

import (
	"Hackathon/db"
	"Hackathon/internal/models"
	"github.com/gofiber/fiber/v2"
	"math"
)

// Radio de la Tierra en kilómetros
const earthRadius = 6371

// Fórmula de Haversine para calcular la distancia en kilómetros entre dos coordenadas
func haversine(lat1, lon1, lat2, lon2 float64) float64 {
	lat1Rad := lat1 * math.Pi / 180
	lon1Rad := lon1 * math.Pi / 180
	lat2Rad := lat2 * math.Pi / 180
	lon2Rad := lon2 * math.Pi / 180

	deltaLat := lat2Rad - lat1Rad
	deltaLon := lon2Rad - lon1Rad

	a := math.Sin(deltaLat/2)*math.Sin(deltaLat/2) +
		math.Cos(lat1Rad)*math.Cos(lat2Rad)*math.Sin(deltaLon/2)*math.Sin(deltaLon/2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	return earthRadius * c // Distancia en kilómetros
}

// VisualizarIndividuos busca individuos en un radio de 100 km
func VisualizarIndividuos(c *fiber.Ctx) error {
	// Parámetros de entrada: ID del usuario y su rol
	id := c.Params("id")   // Obtener el ID del usuario desde la URL
	rol := c.Params("rol") // Obtener el rol desde la URL

	// Convertir ID a entero
	var usuario models.Usuario
	if err := db.DB.Where("id = ?", id).First(&usuario).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Usuario no encontrado",
		})
	}

	// Obtener los individuos con roles diferentes al rol del usuario
	var individuos []models.Usuario
	if err := db.DB.Where("rol != ?", rol).Find(&individuos).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error al consultar los individuos",
		})
	}

	// Crear un slice para almacenar los resultados que estén dentro del radio
	var resultados []models.Usuario

	for _, individuo := range individuos {
		distancia := haversine(usuario.Latitud, usuario.Longitud, individuo.Latitud, individuo.Longitud)
		if distancia <= 100 { // Filtrar por distancia <= 100 km
			resultados = append(resultados, individuo)
		}
	}

	// Retornar los resultados en formato JSON
	return c.Status(fiber.StatusOK).JSON(resultados)
}
