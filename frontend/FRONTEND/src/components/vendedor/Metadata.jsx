import { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import { getUserPerfil } from "../../services/UserServices"; // Ajusta la ruta según tu estructura

export function Metadata() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("user")
  const handleAddToFavorites = () => {
    console.log(`El usuario ${userProfile?.usuario.nombre} ha sido agregado a favoritos`);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserPerfil(userId);
        setUserProfile(data);
      } catch (err) {
        setError("No se pudo cargar la información del usuario");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { usuario, calificaciones } = userProfile;
  const puntuacionPromedio = (
    calificaciones.reduce((sum, item) => sum + item.Puntuacion, 0) / calificaciones.length
  ).toFixed(1);

  return (
    <div className="w-1/3 space-y-4">
      {/* Foto */}
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          {usuario.foto ? (
            <img
              src={usuario.foto}
              alt={usuario.nombre}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-16 h-16 text-gray-400" />
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-lg mb-2">METADATA</h2>
        <div className="space-y-2 text-gray-600">
          <p>Nombre: {usuario.nombre}</p>
          <p>Teléfono: {usuario.telefono}</p>
          <p>Descripción: {usuario.descripcion || "Sin descripción"}</p>
        </div>
      </div>

      {/* Calificaciones */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-lg mb-2">CALIFICACIÓN</h2>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.round(puntuacionPromedio) ? "text-yellow-400" : "text-gray-300"
              }`}
              fill={i < Math.round(puntuacionPromedio) ? "currentColor" : "none"}
            />
          ))}
          <span className="ml-2 text-gray-600">{puntuacionPromedio}/5.0</span>
        </div>
      </div>

      {/* Botón Agregar a Favoritos */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleAddToFavorites}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Agregar a Favoritos
        </button>
      </div>
    </div>
  );
}
