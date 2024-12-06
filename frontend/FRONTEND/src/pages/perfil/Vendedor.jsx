import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';  // Ajusta esta ruta según tu proyecto
import VendedorHome from '../../components/vendedor/VendedorHome';
import VendedorPerfil from '../../components/vendedor/VendedorPerfil';
import Layout from '../../layouts/UserLayout';

const Vendedor = () => {
  const { userRole } = useContext(AuthContext); // Asumiendo que el rol está en el contexto

  return (
    <Layout>
      <div className="h-full">
        <VendedorPerfil />
        
        {/* Mostrar VendedorPerfil solo si el rol es 'Vendedor' */}
        {userRole === 'Vendedor' && <VendedorHome />}
      </div>
    </Layout>
  );
};

export default Vendedor;
