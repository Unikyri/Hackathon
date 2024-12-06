import { useState } from "react";

export function AgregarPublicacion({ toggleAgregarPublicacion }) {
  const [nuevaPublicacion, setNuevaPublicacion] = useState({
    titulo: "",
    descripcion: "",
  });

  const handleAgregar = (e) => {
    e.preventDefault();
    console.log("Publicación agregada:", nuevaPublicacion);
    toggleAgregarPublicacion(); // Cerrar el formulario después de agregar
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h3 className="text-xl font-semibold mb-4">Agregar Nueva Publicación</h3>
        <form onSubmit={handleAgregar}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={nuevaPublicacion.titulo}
              onChange={(e) => setNuevaPublicacion({ ...nuevaPublicacion, titulo: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={nuevaPublicacion.descripcion}
              onChange={(e) => setNuevaPublicacion({ ...nuevaPublicacion, descripcion: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={toggleAgregarPublicacion}
              className="px-4 py-2 bg-red-500 text-white rounded ml-2 hover:bg-red-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
