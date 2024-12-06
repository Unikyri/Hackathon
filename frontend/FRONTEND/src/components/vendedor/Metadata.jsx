import { User } from "lucide-react";

export function Metadata() {
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
            <svg
              key={star}
              className="w-5 h-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
          <span className="ml-2 text-gray-600">4.8/5.0</span>
        </div>
      </div>
    </div>
  );
}
