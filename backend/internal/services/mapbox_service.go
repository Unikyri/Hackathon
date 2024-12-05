package services

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// Constante de token de Mapbox
const mapboxToken = "pk.eyJ1IjoiZGFpa3lyaSIsImEiOiJjbTQ5ZjNzMWQwYXhjMmtvZzQ3dHdkNjQ0In0.Ic4NQJxHhWWik7UXebqx5w"

// GetLocation recibe coordenadas y devuelve información detallada de la ubicación.
func GetLocation(lat, lon string) (map[string]interface{}, error) {
	// Construcción de la URL de la API de Mapbox
	url := fmt.Sprintf("https://api.mapbox.com/geocoding/v5/mapbox.places/%s,%s.json?access_token=%s", lon, lat, mapboxToken)

	// Realiza la solicitud HTTP GET
	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error al solicitar ubicación: %w", err)
	}
	defer resp.Body.Close()

	// Verifica que la respuesta sea exitosa
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("error en respuesta de Mapbox: %s", resp.Status)
	}

	// Leer la respuesta usando io.ReadAll en lugar de ioutil.ReadAll
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error al leer respuesta de Mapbox: %w", err)
	}

	// Parsear el cuerpo de la respuesta JSON
	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("error al parsear respuesta JSON: %w", err)
	}

	return result, nil
}
