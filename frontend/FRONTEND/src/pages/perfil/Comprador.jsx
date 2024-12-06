import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider'; // Asumiendo que tienes un contexto de autenticación
import CompradorHome from '../../components/comprador/CompradorHome';
import CompradorPerfil from '../../components/comprador/CompradorPerfil'; // Componente de perfil
import Layout from '../../layouts/UserLayout';

const Comprador = () => {
  const { userRole } = useContext(AuthContext); // Accede al contexto de autenticación (o estado global)

  return (
    <Layout>
      <div className="h-full">
        {userRole === 'comprador' ? (
          <CompradorHome /> // Si el rol es 'comprador', renderiza el componente de perfil
        ) : (
          <CompradorPerfil /> // Si no es 'comprador', renderiza el componente principal
        )}
      </div>
    </Layout>
  );
};

export default Comprador;
