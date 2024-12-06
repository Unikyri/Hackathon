import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import InteractiveMap from '../../components/InteractiveMap';
import { Publicaciones } from '../../components/vendedor/Publicaciones';

const publicacionesMock = [
	{ id: 1, titulo: "Publicación 1", contenido: "Contenido de la publicación 1." },
	{ id: 2, titulo: "Publicación 2", contenido: "Contenido de la publicación 2." },
	{ id: 3, titulo: "Publicación 3", contenido: "Contenido de la publicación 3." },
  ];

const Home = () => {
	
	return (
		<UserLayout>
			<InteractiveMap />
			<Publicaciones publicaciones={publicacionesMock}/>
		</UserLayout>
	);
};

export default Home;