export function ListaDePublicaciones({ publicacionesVisibles, paginaActual, totalPaginas, setPaginaActual }) {
  return (
    <div>
      <ul className="space-y-4">
        {publicacionesVisibles.map((publicacion) => (
          <li key={publicacion.id} className="p-4 border rounded-lg bg-white shadow-md">
            <h3 className="font-medium text-lg text-black">{publicacion.titulo}</h3>
            <p className="text-gray-500">{publicacion.descripcion}</p>
            <span className="text-gray-600">{publicacion.fecha}</span>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Anterior
        </button>
        <span className="text-gray-600">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => setPaginaActual(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
