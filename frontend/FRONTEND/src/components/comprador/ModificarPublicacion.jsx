import React, { useState } from "react";

export function ModificarPublicacion({ publicacion, setModificarPublicacion }) {
  const [titulo, setTitulo] = useState(publicacion.titulo);
  const [descripcion, setDescripcion] = useState(publicacion.descripcion);

  const handleModificar = () => {
    const modificada = { ...publicacion, titulo, descripcion };
    console.log('Publicación modificada:', modificada);
    setModificarPublicacion(null); // Cerrar el formulario de edición
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 shadow-md rounded-lg w-1/2">
        <h3 className="text-xl font-semibold mb-4">Modificar Publicación</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleModificar();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setModificarPublicacion(null)}
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
