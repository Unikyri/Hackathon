CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario SERIAL PRIMARY KEY,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    coordenadas GEOMETRY(POINT,4326),  -- Asumiendo coordenadas geográficas WGS84
    tel VARCHAR(20),                    -- Ajusta el tamaño según tus necesidades
    nombre VARCHAR(100),
    rol VARCHAR(20),
    foto VARCHAR(255),
    descripcion TEXT
    );

CREATE TABLE IF NOT EXISTS productos (
    id_producto SERIAL PRIMARY KEY,
    fk_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    precio NUMERIC(10,2) NOT NULL,
    cantidad INT NOT NULL,
    categoria VARCHAR(50),
    imagenes TEXT[]
    );

CREATE TABLE IF NOT EXISTS calificaciones (
    id_calificacion SERIAL PRIMARY KEY,
    puntuacion SMALLINT CHECK (puntuacion BETWEEN 1 AND 5), -- SMALLINT es más eficiente para valores pequeños
    reseña TEXT,
    fk_iduser_comprador INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fk_iduser_vendedor INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    UNIQUE (fk_iduser_comprador, fk_iduser_vendedor) -- Evita autocalificaciones
    );

CREATE TABLE IF NOT EXISTS publicaciones (
    id_publicacion SERIAL PRIMARY KEY,
    fk_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS favoritos (
    id_fav SERIAL PRIMARY KEY,
    fk_usuario_que_agrega INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fk_usuario_agregado INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    UNIQUE (fk_usuario_que_agrega, fk_usuario_agregado) -- Evita duplicados
    );

-- Agregar columnas a la tabla 'usuarios'
DO $$
BEGIN
    -- Verificar si la columna 'foto' ya existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='usuarios' AND column_name='foto') THEN
ALTER TABLE usuarios ADD COLUMN foto VARCHAR(255);
END IF;

    -- Verificar si la columna 'descripcion' ya existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='usuarios' AND column_name='descripcion') THEN
ALTER TABLE usuarios ADD COLUMN descripcion TEXT;
END IF;
END $$;

-- Agregar columnas a la tabla 'productos'
DO $$
BEGIN
    -- Verificar si la columna 'imagenes' ya existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='productos' AND column_name='imagenes') THEN
ALTER TABLE productos ADD COLUMN imagenes TEXT[];
END IF;
END $$;

-- Agregar columnas a la tabla 'calificaciones'
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

-- Crear tabla 'publicaciones' si no existe
CREATE TABLE IF NOT EXISTS publicaciones (
    id_publicacion SERIAL PRIMARY KEY,
    fk_idusuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE
    );

-- Crear tabla 'favoritos' si no existe
CREATE TABLE IF NOT EXISTS favoritos (
    id_fav SERIAL PRIMARY KEY,
    fk_idusuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fk_idusuario_favorito INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE
    );
