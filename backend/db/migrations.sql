-- Tabla Usuario
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    coordenadas VARCHAR(50),
    tel VARCHAR(15),
    nombre VARCHAR(100),
    rol VARCHAR(20)
    );

-- Tabla Producto
CREATE TABLE IF NOT EXISTS productos (
    id_producto SERIAL PRIMARY KEY,
    fk_usuario INT REFERENCES usuarios(id_usuario),
    precio NUMERIC(10, 2) NOT NULL,
    cantidad INT NOT NULL,
    categoria VARCHAR(50)
    );

-- Tabla Calificacion
CREATE TABLE IF NOT EXISTS calificaciones (
    id_calificacion SERIAL PRIMARY KEY,
    puntuacion INT CHECK(puntuacion >= 1 AND puntuacion <= 5),
    reseña TEXT,
    fk_iduser_comprador INT REFERENCES usuarios(id_usuario),
    fk_iduser_vendedor INT REFERENCES usuarios(id_usuario)
    );
