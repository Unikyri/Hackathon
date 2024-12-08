import React from 'react'
import { Link } from "@nextui-org/react"

export default function Footer() {
  return (
    <footer className="bg-[#b2cef3e3] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <p>Email: info@meaeting.tech</p>
            <p>Teléfono: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Redes Sociales</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-white hover:underline">Facebook</Link></li>
              <li><Link href="#" className="text-white hover:underline">Twitter</Link></li>
              <li><Link href="#" className="text-white hover:underline">Instagram</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Ubicación</h3>
            <p>Sede principal: Torre comercial DEV</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>© 2024 Meaeting </p>
          <p>Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}