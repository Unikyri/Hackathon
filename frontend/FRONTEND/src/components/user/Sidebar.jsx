import React, { useContext, useRef, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
export default function Sidebar() {
  const { sidebarState, setSidebarState } = useContext(UserContext);
  const {setSession } = useContext(AuthContext);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // Cierra el sidebar si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarState(false); // Cierra el sidebar
      }
    };

    if (sidebarState) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarState, setSidebarState]);

  // Maneja el cierre de sesión
  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmLogout) {
      console.log("se cerro sesion")
      // Cambiar estados del contexto
      setSession(false);
      setSidebarState(false);

      // Actualizar el localStorage
      localStorage.setItem("session", "false");
      localStorage.setItem("role", "null");
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform transform ${
        sidebarState ? 'translate-x-0' : '-translate-x-full'
      } z-50`}
    >
      <div className="flex flex-col h-full">
        {/* Sección del perfil */}
      <a href='/perfil'>
        <div className="p-4 border-b border-gray-600 flex items-center">
          <div className="w-12 h-12 bg-gray-500 rounded-full mr-3"></div>
          <div>
            <h3 className="text-lg font-bold">Nombre</h3>
            <p className="text-sm text-gray-400">Detalles...</p>
          </div>
        </div>
      </a>
        {/* Opciones del menú */}
        <nav className="flex-grow">
          <ul className="p-4 space-y-4">
            <a className='p-2' href="/favoritos">
              <li className="bg-gray-700 rounded-md p-3 text-center hover:bg-gray-600 cursor-pointer">
                Favoritos
              </li>
            </a>
            <a className='p-2' href="/">
              <li className="bg-gray-700 rounded-md p-3 text-center hover:bg-gray-600 cursor-pointer">
                Publicaciones
              </li>
            </a>
            <a className='p-2' href="/">
              <li className="bg-gray-700 rounded-md p-3 text-center hover:bg-gray-600 cursor-pointer">
                Productos
              </li>
            </a>
          </ul>
        </nav>

        {/* Botón para cerrar sesión */}
        <div className="p-4">
          <button
            className="w-full bg-red-600 hover:bg-red-500 text-white p-3 rounded-md"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  );
}
