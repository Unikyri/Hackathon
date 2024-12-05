package services

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

const mapboxToken = "pk.eyJ1IjoiZGFpa3lyaSIsImEiOiJjbTQ5ZjNzMWQwYXhjMmtvZzQ3dHdkNjQ0In0.Ic4NQJxHhWWik7UXebqx5w"

// GetLocation recibe coordenadas y devuelve información detallada de la ubicación.
func GetLocation(lat, lon string) (map[string]interface{}, error) {
	url := fmt.Sprintf("https://api.mapbox.com/geocoding/v5/mapbox.places/%s,%s.json?access_token=%s", lon, lat, mapboxToken)
	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error al solicitar ubicación: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("error en respuesta de Mapbox: %s", resp.Status)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error al leer respuesta de Mapbox: %w", err)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("error al parsear respuesta JSON: %w", err)
	}

	return result, nil
}
