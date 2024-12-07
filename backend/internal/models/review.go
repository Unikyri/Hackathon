package models

// Calificacion representa el modelo de calificación o reseña de un usuario hacia otro.
type Calificacion struct {
	ID           uint    `gorm:"primaryKey;autoIncrement"` // ID como clave primaria, autoincrementable
	Puntuacion   int     `gorm:"not null"`                 // Puntuación del 1 al 5 (o según tu criterio)
	Resenia      string  `gorm:"type:text;not null"`       // Reseña escrita por el reseniador
	ReseniadorID uint    `gorm:"not null"`                 // Llave foránea hacia el usuario que hace la reseña (reseniador)
	ReseniadoID  uint    `gorm:"not null"`                 // Llave foránea hacia el usuario que recibe la reseña (reseniado)
	Reseniador   Usuario `gorm:"foreignKey:ReseniadorID"`  // Relación con el modelo Usuario (reseniador)
	Reseniado    Usuario `gorm:"foreignKey:ReseniadoID"`   // Relación con el modelo Usuario (reseniado)
}

func (Calificacion) TableName() string {
	return "calificaciones" // Aquí le indicamos a GORM que la tabla se llama "publicaciones"
}
