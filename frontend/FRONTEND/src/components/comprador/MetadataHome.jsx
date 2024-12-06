import { Star, User } from 'lucide-react';

export function MetadataHome() {
  return (
    <div className="w-1/3 space-y-4">
      {/* Photo Section */}
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-16 h-16 text-gray-400" />
        </div>
      </div>

      {/* Metadata Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-lg mb-2">METADATA</h2>
        <div className="space-y-2 text-gray-600">
          <p>Nombre: Juan Pérez</p>
          <p>Email: juan@ejemplo.com</p>
          <p>Ubicación: Ciudad</p>
          <p>Miembro desde: 2023</p>
        </div>
      </div>

      {/* Rating Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-lg mb-2">CALIFICACIÓN</h2>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
            />
          ))}
          <span className="ml-2 text-gray-600">4.8/5.0</span>
        </div>
      </div>
    </div>
  );
}
