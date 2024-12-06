-- Borrar las tablas existentes
DROP TABLE IF EXISTS favoritos CASCADE;
DROP TABLE IF EXISTS publicaciones CASCADE;
DROP TABLE IF EXISTS calificaciones CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Crear tabla 'usuarios'
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    longitud FLOAT NOT NULL,     -- Longitud en lugar de coordenadas
    latitud FLOAT NOT NULL,      -- Latitud en lugar de coordenadas
    tel VARCHAR(20),
    nombre VARCHAR(100),
    rol VARCHAR(20),
    foto BYTEA,                  -- Usamos BYTEA para almacenar imágenes en Go (se usa []byte en lugar de VARCHAR)
    descripcion TEXT
    );

-- Crear tabla 'productos'
CREATE TABLE IF NOT EXISTS productos (
    id_producto SERIAL PRIMARY KEY,
    fk_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    precio NUMERIC(10,2) NOT NULL,
    cantidad INT NOT NULL,
    categoria VARCHAR(50),
    imagenes TEXT[]             -- Usamos TEXT[] para almacenar múltiples imágenes
    );

-- Crear tabla 'calificaciones'
CREATE TABLE IF NOT EXISTS calificaciones (
    id_calificacion SERIAL PRIMARY KEY,
    puntuacion SMALLINT CHECK (puntuacion BETWEEN 1 AND 5),
    reseña TEXT,
    fk_iduser_comprador INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fk_iduser_vendedor INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fk_idproducto INT REFERENCES productos(id_producto) ON DELETE CASCADE, -- Relacionar con productos
    UNIQUE (fk_iduser_comprador, fk_iduser_vendedor) -- Evitar autocalificaciones
    );

-- Crear tabla 'publicaciones'
CREATE TABLE IF NOT EXISTS publicaciones (
    id_publicacion SERIAL PRIMARY KEY,
    fk_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Crear tabla 'favoritos'
CREATE TABLE IF NOT EXISTS favoritos (
    id_fav SERIAL PRIMARY KEY,
    fk_usuario_que_agrega INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fk_usuario_agregado INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    UNIQUE (fk_usuario_que_agrega, fk_usuario_agregado) -- Evita duplicados
    );

-- Agregar columnas a la tabla 'usuarios' si no existen
DO $$
BEGIN
    -- Verificar si la columna 'foto' ya existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='usuarios' AND column_name='foto') THEN
ALTER TABLE usuarios ADD COLUMN foto BYTEA;
END IF;

    -- Verificar si la columna 'descripcion' ya existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='usuarios' AND column_name='descripcion') THEN
ALTER TABLE usuarios ADD COLUMN descripcion TEXT;
END IF;
END $$;

-- Agregar columnas a la tabla 'productos' si no existen
DO $$
BEGIN
    -- Verificar si la columna 'imagenes' ya existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='productos' AND column_name='imagenes') THEN
ALTER TABLE productos ADD COLUMN imagenes TEXT[];
END IF;
END $$;

-- Agregar columnas a la tabla 'calificaciones' si no existen
DO $$
BEGIN
    -- Verificar si las columnas 'fk_iduser_comprador' y 'fk_iduser_vendedor' ya existen
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calificaciones' AND column_name='fk_iduser_comprador') THEN
ALTER TABLE calificaciones ADD COLUMN fk_iduser_comprador INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE;
END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calificaciones' AND column_name='fk_iduser_vendedor') THEN
ALTER TABLE calificaciones ADD COLUMN fk_iduser_vendedor INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE;
END IF;
END $$;

-- Agregar columna a la tabla 'calificaciones' para relacionar con productos si no existe
DO $$
BEGIN
    -- Verificar si la columna 'fk_idproducto' ya existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calificaciones' AND column_name='fk_idproducto') THEN
ALTER TABLE calificaciones ADD COLUMN fk_idproducto INT REFERENCES productos(id_producto) ON DELETE CASCADE;
END IF;
END $$;

