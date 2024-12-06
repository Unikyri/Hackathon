package models

import "time"

// Publicacion representa una publicación realizada por un usuario.
type Publicacion struct {
	ID          uint      `gorm:"primaryKey;autoIncrement"` // ID como clave primaria, autoincrementable
	UsuarioID   uint      `gorm:"not null"`                 // Llave foránea hacia Usuario
	Usuario     Usuario   `gorm:"foreignKey:UsuarioID"`     // Relación con el modelo Usuario
	Publicacion string    `gorm:"type:text;not null"`       // Contenido de la publicación
	Fecha       time.Time `gorm:"not null"`                 // Fecha de la publicación
}
