import React, { useContext } from 'react';
import {
	Link,
} from '@nextui-org/react';
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
          src="https://cdn.icon-icons.com/icons2/1875/PNG/512/hamburgermenu_120234.png"
          alt="Menu-logo"
          className="w-10 h-10"
        />
      </button>

      {/* Espacio para otros elementos del Navbar */}
      <Link href="/home">
        <div className="flex items-center justify-center gap-4">
          <img src="./logo-web.png" className="w-16" />
        </div>
      </Link>
      <div></div>
    </nav>
  );
}
