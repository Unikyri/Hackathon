import React, { useState } from "react";

export function Publicaciones({ publicaciones }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const publicacionesPorPagina = 2;
  const totalPublicaciones = publicaciones.length;

  // Calcular el índice inicial y final de las publicaciones a mostrar
  const indiceFinal = paginaActual * publicacionesPorPagina;
  const indiceInicial = indiceFinal - publicacionesPorPagina;
  const publicacionesAMostrar = publicaciones.slice(indiceInicial, indiceFinal);

  // Funciones para la paginación
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas()) {
      setPaginaActual(nuevaPagina);
    }
  };

  const totalPaginas = () => {
    return Math.ceil(totalPublicaciones / publicacionesPorPagina);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="font-semibold text-lg mb-4 text-black">PUBLICACIONES</h2>

      <div className="space-y-6">
        {publicacionesAMostrar.map((publicacion) => (
          <div
            key={publicacion.id}
            className="border rounded-lg p-4 bg-white shadow-md transition-transform transform hover:scale-105"
          >
            <h3 className="font-medium text-lg mb-2">{publicacion.titulo}</h3>
            <p className="text-gray-600">{publicacion.contenido}</p>
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
