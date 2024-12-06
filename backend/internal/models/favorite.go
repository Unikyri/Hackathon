package models

// Favoritos representa la relación entre un usuario y sus usuarios favoritos.
type Favoritos struct {
	ID                uint    `gorm:"primaryKey;autoIncrement"`     // ID como clave primaria, autoincrementable
	UsuarioID         uint    `gorm:"not null"`                     // Llave foránea hacia el usuario que agrega al favorito
	UsuarioFavoritoID uint    `gorm:"not null"`                     // Llave foránea hacia el usuario que es marcado como favorito
	Usuario           Usuario `gorm:"foreignKey:UsuarioID"`         // Relación con el modelo Usuario (usuario que agrega al favorito)
	UsuarioFavorito   Usuario `gorm:"foreignKey:UsuarioFavoritoID"` // Relación con el modelo Usuario (usuario que es favorito)
}
