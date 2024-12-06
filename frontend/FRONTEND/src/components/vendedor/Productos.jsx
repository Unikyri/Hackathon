import React, { useState } from "react";

export function Productos({ productos }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 3;
  const totalProductos = productos.length;

  // Calcular el índice inicial y final de los productos a mostrar
  const indiceFinal = paginaActual * productosPorPagina;
  const indiceInicial = indiceFinal - productosPorPagina;
  const productosAMostrar = productos.slice(indiceInicial, indiceFinal);

  // Funciones para la paginación
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas()) {
      setPaginaActual(nuevaPagina);
    }
  };

  const totalPaginas = () => {
    return Math.ceil(totalProductos / productosPorPagina);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="font-semibold text-lg mb-4 text-black">PRODUCTOS</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosAMostrar.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg p-4 bg-white shadow-md transition-transform transform hover:scale-105"
          >
            <div className="bg-gray-200 h-32 rounded-md mb-4"></div>
            <h3 className="font-medium text-lg mb-2">{producto.nombre}</h3>
            <p className="text-gray-600">${producto.precio.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Anterior
        </button>
        <span className="text-gray-600">
          Página {paginaActual} de {totalPaginas()}
        </span>
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas()}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
