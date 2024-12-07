package models

// Usuario representa el modelo de usuario en la base de datos.
type Usuario struct {
	ID          uint    `gorm:"primaryKey;autoIncrement"` // ID como clave primaria, autoincrementable
	Foto        []byte  `gorm:"type:bytea"`               // Foto almacenada como tipo bytea
	Correo      string  `gorm:"unique;not null"`          // Correo único y no nulo
	Contrasenia string  `gorm:"not null"`                 // Contraseña no nula
	Longitud    float64 `gorm:"not null"`                 // Longitud no nula
	Latitud     float64 `gorm:"not null"`                 // Latitud no nula
	Telefono    string  `gorm:"not null"`                 // Teléfono no nulo
	Nombre      string  `gorm:"not null"`                 // Nombre no nulo
	Rol         string  `gorm:"not null"`                 // Rol no nulo
	Descripcion string  `gorm:"type:text"`                // Descripción como texto (puede ser largo)
}

func (Usuario) TableName() string {
	return "usuarios" // Aquí le indicamos a GORM que la tabla se llama "publicaciones"
}
