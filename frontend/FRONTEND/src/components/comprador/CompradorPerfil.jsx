import { Star, User } from 'lucide-react'

export default function VendedorPerfil() {
  return (
    <div className=" mx-auto p-6 bg-white w-full h-full">
      <div className="flex gap-6">
        {/* Left Column */}
        <div className=" w-1/3  space-y-4">
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

        {/* Right Column */}
        <div className="w-2/3 space-y-6">
          {/* Products Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-lg mb-4">PRODUCTOS</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((product) => (
                <div key={product} className="border rounded-lg p-3">
                  <div className="bg-gray-200 h-32 rounded-md mb-2"></div>
                  <h3 className="font-medium">Producto {product}</h3>
                  <p className="text-gray-600">$99.99</p>
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

