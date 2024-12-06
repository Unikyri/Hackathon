import { useState } from "react";
import { ModificarPublicacion } from "./ModificarPublicacion"; // Componente de modificación
import { AgregarPublicacion } from "./AgregarPublicacion"; // Componente para agregar publicación

export function ListaDePublicacionesHome({
  publicacionesVisibles,
  paginaActual,
  totalPaginas,
  setPaginaActual,
}) {
  const [modificarPublicacion, setModificarPublicacion] = useState(null);
  const [agregarPublicacionVisible, setAgregarPublicacionVisible] = useState(false);

  const eliminarPublicacion = (id) => {
    console.log(`Eliminando publicación con ID: ${id}`);
  };

  const editarPublicacion = (publicacion) => {
    setModificarPublicacion(publicacion);
  };

  const toggleAgregarPublicacion = () => {
    setAgregarPublicacionVisible(!agregarPublicacionVisible);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-black">Publicaciones</h2>
        <button
          onClick={toggleAgregarPublicacion}
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          <span className="text-xl">+</span>
        </button>
      </div>

      {/* Componente para agregar una nueva publicación */}
      {agregarPublicacionVisible && (
        <AgregarPublicacion toggleAgregarPublicacion={toggleAgregarPublicacion} />
      )}

      {/* Componente de modificación de publicación */}
      {modificarPublicacion && (
        <ModificarPublicacion
          publicacion={modificarPublicacion}
          setModificarPublicacion={setModificarPublicacion}
        />
      )}

      <ul className="space-y-4">
        {publicacionesVisibles.map((publicacion) => (
          <li key={publicacion.id} className="p-4 border rounded-lg bg-white shadow-md">
            <h3 className="font-medium text-lg text-black">{publicacion.titulo}</h3>
            <p className="text-gray-500">{publicacion.descripcion}</p>
            <span className="text-gray-600">{publicacion.fecha}</span>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => eliminarPublicacion(publicacion.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <span className="material-icons">delete</span> {/* Ícono de borrar */}
              </button>
              <button
                onClick={() => editarPublicacion(publicacion)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <span className="material-icons">edit</span> {/* Ícono de editar */}
              </button>
            </div>
          </li>
        ))}
      </ul>

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
