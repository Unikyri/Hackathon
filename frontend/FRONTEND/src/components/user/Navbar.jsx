import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';

export default function Navbar() {
  const { setSidebarState } = useContext(UserContext);

  return (
    <nav className="bg-blue-500 p-4 flex items-center justify-between">
      {/* Botón en la esquina izquierda */}
      <button
        onClick={() => setSidebarState((prev) => !prev)}
        className="flex items-center"
      >
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          className="w-10 h-10"
        />
      </button>

      {/* Espacio para otros elementos del Navbar */}
      <div className="flex-grow"></div>
    </nav>
  );
}
