import { MetadataHome } from "./MetadataHome";
import { Productos } from "./Productos";
import { Publicaciones } from "./Publicaciones";

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

export default function VendedorPerfil() {
  return (
    <div className="mx-auto p-6 bg-white w-full h-full">
      <div className="flex gap-6">
        {/* Metadata Section */}
        <MetadataHome />
        {/* Right Column */}
        <div className="w-2/3 space-y-6">
          <Productos productos={productosMock} />
          <Publicaciones publicaciones={publicacionesMock} />
        </div>
      </div>
    </div>
  );
}
