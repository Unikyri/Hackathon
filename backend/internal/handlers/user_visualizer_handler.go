package handlers

import (
	"Hackathon/db"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Individuo struct {
	ID       uint    `json:"id"`
	Latitud  float64 `json:"latitud"`
	Longitud float64 `json:"longitud"`
}

func connectToDB() error {
	dsn := "user=yourusername password=yourpassword dbname=yourdbname port=5432 sslmode=disable"
	db, err := db.DB.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return db, nil
}
