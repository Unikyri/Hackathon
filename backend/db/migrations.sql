-- Borrar las tablas existentes en orden correcto para evitar conflictos por las relaciones
DROP TABLE IF EXISTS favoritos CASCADE;
DROP TABLE IF EXISTS calificaciones CASCADE;
DROP TABLE IF EXISTS publicaciones CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Crear tabla 'usuarios'
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    foto BYTEA,                        -- Foto almacenada como tipo bytea
    correo VARCHAR(100) UNIQUE NOT NULL, -- Correo único y no nulo
    contrasenia VARCHAR(100) NOT NULL,   -- Contraseña no nula
    longitud FLOAT NOT NULL,           -- Longitud (coordenadas)
    latitud FLOAT NOT NULL,            -- Latitud (coordenadas)
    telefono VARCHAR(20) NOT NULL,     -- Teléfono no nulo
    nombre VARCHAR(100) NOT NULL,      -- Nombre no nulo
    rol VARCHAR(50) NOT NULL,          -- Rol del usuario (ejemplo: comprador, vendedor)
    descripcion TEXT                   -- Descripción del usuario
    );

-- Crear tabla 'calificaciones'
CREATE TABLE IF NOT EXISTS calificaciones (
    id SERIAL PRIMARY KEY,
    puntuacion SMALLINT CHECK (puntuacion BETWEEN 1 AND 5) NOT NULL, -- Puntuación entre 1 y 5
    resenia TEXT NOT NULL,                  -- Texto de la reseña
    reseniador_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE, -- Usuario que hace la reseña
    reseniado_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,  -- Usuario que recibe la reseña
    UNIQUE (reseniador_id, reseniado_id)    -- Evitar que un usuario califique dos veces al mismo
    );

-- Crear tabla 'publicaciones'
CREATE TABLE IF NOT EXISTS publicaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE, -- Relación con usuarios
    publicacion TEXT NOT NULL,         -- Contenido de la publicación
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    categoria VARCHAR(100) NOT NULL,   -- Categoría del producto
    foto BYTEA                         -- Foto de la publicación
    );

-- Crear tabla 'favoritos'
CREATE TABLE IF NOT EXISTS favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,        -- Usuario que agrega el favorito
    usuario_favorito_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE, -- Usuario que es marcado como favorito
    UNIQUE (usuario_id, usuario_favorito_id) -- Evitar duplicados en la relación de favoritos
    );
