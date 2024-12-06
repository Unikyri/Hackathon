package models

type Producto struct {
	ID        uint    `gorm:"primaryKey"`
	FKUsuario uint    `gorm:"not null"`
	Precio    float64 `gorm:"not null"`
	Cantidad  int     `gorm:"not null"`
	Categoria string  `gorm:"not null"`
	Imagenes  string  // Puedes usar un tipo como string o array de strings si tienes múltiples imágenes
	Usuario   Usuario `gorm:"foreignKey:FKUsuario"`
}
