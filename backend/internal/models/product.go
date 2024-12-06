package models

type Producto struct {
	ID        uint    `gorm:"primaryKey;autoIncrement"` // ID como clave primaria, autoincrementable
	UsuarioID uint    `gorm:"not null"`                 // Llave foránea hacia Usuario (referencia al campo ID de Usuario)
	Usuario   Usuario `gorm:"foreignKey:UsuarioID"`     // Relación con el modelo Usuario
	Foto      []byte  `gorm:"type:bytea"`               // Foto del producto como tipo bytea
	Precio    float64 `gorm:"not null"`                 // Precio del producto (puedes ajustar esto según el tipo de moneda)
	Cantidad  int     `gorm:"not null"`                 // Cantidad disponible del producto
	Categoria string  `gorm:"not null"`                 // Categoría del producto
}
