import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider'; // Asumiendo que tienes un contexto de autenticación
import CompradorHome from '../../components/comprador/CompradorHome';
import CompradorPerfil from '../../components/comprador/CompradorPerfil'; // Componente de perfil
import Layout from '../../layouts/UserLayout';

export const Comprador = () => {
	const { userRole } = useContext(AuthContext); // Accede al contexto de autenticación (o estado global)

	return (
		<Layout>
			<div className="h-full">
				<div className="h-full">
					{userRole === 'vendedor' ? (
						<CompradorPerfil/>
					) : (
						<CompradorHome/> //Mostrar VendedorPerfil solo si el rol es 'Vendedor'
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Comprador;