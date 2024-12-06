import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

export function ProductosHome({ productos, onAgregar, onEliminar, onModificar }) {
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
      <div className="flex items-center justify-between mb-4">
        
        <h2 className="font-semibold text-lg text-black">PRODUCTOS</h2>
        <button
          onClick={onAgregar}
          className="p-2 bg-green-500 text-white rounded-full flex items-center justify-center"
        >
          <FaPlus />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosAMostrar.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg p-4 bg-white shadow-md transition-transform transform hover:scale-105"
          >
            <div className="bg-gray-200 h-32 rounded-md mb-4"></div>
            <h3 className="font-medium text-lg mb-2">{producto.nombre}</h3>
            <p className="text-gray-600">${producto.precio.toFixed(2)}</p>

            {/* Botones de edición y eliminación */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => onModificar(producto.id)}
                className="p-2 bg-yellow-400 text-white rounded-full"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onEliminar(producto.id)}
                className="p-2 bg-red-500 text-white rounded-full"
              >
                <FaTrashAlt />
              </button>
            </div>
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
