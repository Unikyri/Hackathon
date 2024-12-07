import React from 'react';
import {
	Button,
	Select,
	SelectItem,
} from '@nextui-org/react';
import UserLayout from '../../layouts/UserLayout';
import InteractiveMap from '../../components/InteractiveMap';
import { Publicaciones } from '../../components/vendedor/Publicaciones';

const publicacionesMock = [
	{ id: 1, titulo: "Publicación 1", contenido: "Contenido de la publicación 1." },
	{ id: 2, titulo: "Publicación 2", contenido: "Contenido de la publicación 2." },
	{ id: 3, titulo: "Publicación 3", contenido: "Contenido de la publicación 3." },
  ];

  
  const Home = () => {
	const [filtro, setFiltro] = React.useState('');

	const filtros = ['Comprador', 'Vendedor', 'Res', "Cerdo", "Pollo", "Pescado"];

	const handleSelectChange = (field, value) => {
		setUserData({ ...userData, [field]: value });
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
			className="bg-black-100 w-1/4"
		>
			{filtros.map((tipo, index) => (
				<SelectItem className=' bg-red hover:bg-gray-700' key={index} value={tipo}>
					{tipo.charAt(0).toUpperCase() + tipo.slice(1)}
				</SelectItem>
			))}
		</Select>
		<Button>Buscar</Button>
		</div>
			<InteractiveMap />
			<Publicaciones publicaciones={publicacionesMock}/>
		</UserLayout>
	);
};

export default Home;