package models

type Calificacion struct {
	ID         uint     `gorm:"primaryKey"`
	Puntuacion int      `gorm:"not null"` // Puntuación en estrellas
	Reseña     string   `gorm:"not null"`
	FKUsuario  uint     `gorm:"not null"` // Relacionado con el comprador
	FKProducto uint     `gorm:"not null"` // Relacionado con el producto
	Comprador  Usuario  `gorm:"foreignKey:FKUsuario"`
	Producto   Producto `gorm:"foreignKey:FKProducto"`
}
