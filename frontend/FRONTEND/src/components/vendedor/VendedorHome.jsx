import React, { useState } from "react";

import { Metadata } from "./Metadata";
import { ProductosHome } from "./ProductosHome";
import { PublicacionesHome } from "./PublicacionesHome";

const productosMock = [
  { id: 1, nombre: "Producto 1", precio: 99.99 },
  { id: 2, nombre: "Producto 2", precio: 49.99 },
  { id: 3, nombre: "Producto 3", precio: 149.99 },
  { id: 4, nombre: "Producto 4", precio: 199.99 },
];

const publicacionesMock = [
  { id: 1, titulo: "Publicación 1", contenido: "Contenido de la publicación 1." },
  { id: 2, titulo: "Publicación 2", contenido: "Contenido de la publicación 2." },
  { id: 3, titulo: "Publicación 3", contenido: "Contenido de la publicación 3." },
];

export default function VendedorHome() {
  const [productos, setProductos] = useState(productosMock);
  const [publicaciones, setPublicaciones] = useState(publicacionesMock);

  const agregarProducto = () => {
    const nuevoProducto = {
      id: productos.length + 1,
      nombre: `Producto ${productos.length + 1}`,
      precio: (Math.random() * 200).toFixed(2),
    };
    setProductos([...productos, nuevoProducto]);
  };

  const agregarPublicacion = () => {
    const nuevaPublicacion = {
      id: publicaciones.length + 1, // Corregido a publicaciones en lugar de publicacion
      titulo: `Publicación ${publicaciones.length + 1}`, // Cambié nombre a título
      contenido: `Contenido de la publicación ${publicaciones.length + 1}`, // Cambié nombre a contenido
    };
    setPublicaciones([...publicaciones, nuevaPublicacion]); // Cambié publicacion a publicaciones
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const modificarProducto = (id) => {
    const nuevoNombre = prompt("Ingrese el nuevo nombre del producto");
    const nuevoPrecio = prompt("Ingrese el nuevo precio del producto");

    setProductos(
      productos.map((producto) =>
        producto.id === id
          ? { ...producto, nombre: nuevoNombre, precio: parseFloat(nuevoPrecio) }
          : producto
      )
    );
  };

  const eliminarPublicacion = (id) => {
    setPublicaciones(publicaciones.filter((publicacion) => publicacion.id !== id));
  };

  const modificarPublicacion = (id) => {
    const nuevoTitulo = prompt("Ingrese el nuevo título de la publicación");
    const nuevoContenido = prompt("Ingrese el nuevo contenido de la publicación");

    setPublicaciones(
      publicaciones.map((publicacion) =>
        publicacion.id === id
          ? { ...publicacion, titulo: nuevoTitulo, contenido: nuevoContenido }
          : publicacion
      )
    );
  };

  return (
    <div className="mx-auto p-6 bg-white w-full h-full">
      <div className="flex gap-6">
        {/* Metadata Section */}
        <Metadata />
        {/* Right Column */}
        <div className="w-2/3 space-y-6">
          <ProductosHome
            productos={productos}
            onAgregar={agregarProducto}
            onEliminar={eliminarProducto}
            onModificar={modificarProducto}
          />
          <PublicacionesHome
            publicaciones={publicaciones}
            onAgregar={agregarPublicacion}
            onEliminar={eliminarPublicacion}
            onModificar={modificarPublicacion}
          />
        </div>
      </div>
    </div>
  );
}
