import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';  // Ajusta esta ruta según tu proyecto
import VendedorHome from '../../components/vendedor/VendedorHome';
import VendedorPerfil from '../../components/vendedor/VendedorPerfil';
import Layout from '../../layouts/UserLayout';

export const Vendedor = () => {
  const { userRole } = useContext(AuthContext); // Asumiendo que el rol está en el contexto

  return (
    <Layout>
      <div className="h-full">
      {userRole === 'vendedor' ? (
        <VendedorPerfil />
      ):(
        <VendedorHome /> //Mostrar VendedorPerfil solo si el rol es 'Vendedor'
      )}
      </div>
    </Layout>
  );
};

export default Vendedor;
