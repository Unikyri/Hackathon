import React, { useEffect, useState } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import UserLayout from '../../layouts/UserLayout';
import InteractiveMap from '../../components/InteractiveMap';
import { Publicaciones } from '../../components/vendedor/Publicaciones';
import { getUserPerfil } from '../../services/UserServices';

const Home = () => {
  const [filtro, setFiltro] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);
  const filtros = ['Comprador', 'Vendedor', 'Res', 'Cerdo', 'Pollo', 'Pescado'];

  useEffect(() => {
    // Obtener el ID del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (userId) {
      // Llamar al servicio para obtener el perfil del usuario
      getUserPerfil(userId)
        .then((data) => {
          // Asegúrate de que las publicaciones estén en la estructura esperada
          setPublicaciones(data.publicaciones || []);
        })
        .catch((error) => {
          console.error('Error al obtener el perfil del usuario:', error);
        });
    }
  }, []);

  const handleSelectChange = (field, value) => {
    setFiltro(value);
  };

  return (
    <UserLayout>
      <div>
        <Select
          label="Filtro"
          placeholder="Selecciona una opción para filtrar"
          value={filtro}
          onChange={(e) => handleSelectChange('filtro', e.target.value)}
          required
          className="text-black w-1/4"
        >
          {filtros.map((tipo, index) => (
            <SelectItem
              className="bg-gray-500 hover:bg-gray-700"
              key={index}
              value={tipo}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </SelectItem>
          ))}
        </Select>
        <Button>Buscar</Button>
      </div>
      <InteractiveMap />
      <Publicaciones publicaciones={publicaciones} />
    </UserLayout>
  );
};

export default Home;
