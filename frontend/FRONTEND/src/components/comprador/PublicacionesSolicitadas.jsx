import { useState } from "react";
import { ListaDePublicaciones } from "./ListaDePublicaciones"; // Asegúrate de tener este componente ajustado para mostrar publicaciones.

export function PublicacionesSolicitadas() {
  // Aquí debes cargar las publicaciones solicitadas por el comprador
  const publicaciones = [
    { id: 1, titulo: "Publicación 1", descripcion: "Descripción de la publicación 1", fecha: "2024-12-05" },
    { id: 2, titulo: "Publicación 2", descripcion: "Descripción de la publicación 2", fecha: "2024-12-04" },
    { id: 3, titulo: "Publicación 3", descripcion: "Descripción de la publicación 3", fecha: "2024-12-03" },
    { id: 4, titulo: "Publicación 4", descripcion: "Descripción de la publicación 4", fecha: "2024-12-02" },
    { id: 5, titulo: "Publicación 5", descripcion: "Descripción de la publicación 5", fecha: "2024-12-01" },
    { id: 6, titulo: "Publicación 6", descripcion: "Descripción de la publicación 6", fecha: "2024-11-30" },
    { id: 7, titulo: "Publicación 7", descripcion: "Descripción de la publicación 7", fecha: "2024-11-29" },
    { id: 8, titulo: "Publicación 8", descripcion: "Descripción de la publicación 8", fecha: "2024-11-28" },
    { id: 9, titulo: "Publicación 9", descripcion: "Descripción de la publicación 9", fecha: "2024-11-27" },
    { id: 10, titulo: "Publicación 10", descripcion: "Descripción de la publicación 10", fecha: "2024-11-26" },
  ];

  const publicacionesPorPagina = 6;
  const [paginaActual, setPaginaActual] = useState(1);

  const indiceInicio = (paginaActual - 1) * publicacionesPorPagina;
  const indiceFin = indiceInicio + publicacionesPorPagina;
  const publicacionesVisibles = publicaciones.slice(indiceInicio, indiceFin);

  const totalPaginas = Math.ceil(publicaciones.length / publicacionesPorPagina);

  return (
    <div className="w-2/3 space-y-6">
      <ListaDePublicaciones
        publicacionesVisibles={publicacionesVisibles}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        setPaginaActual={setPaginaActual}
      />
    </div>
  );
}
