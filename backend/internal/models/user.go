package models

type Usuario struct {
	ID          uint    `gorm:"primaryKey"`
	Correo      string  `gorm:"unique;not null"`
	Contrasenia string  `gorm:"not null"`
	Longitud    float64 `gorm:"not null"`
	Latitud     float64 `gorm:"not null"`
	Telefono    string  `gorm:"not null"`
	Nombre      string  `gorm:"not null"`
	Rol         string  `gorm:"not null"`
	Foto        []byte
	Descripcion string
	Productos   []Producto     `gorm:"foreignKey:FKUsuario"`
	Reseñas     []Calificacion `gorm:"foreignKey:FKUsuario"`
}
