import CompradorPerfil from '../../components/comprador/CompradorPerfil';
import Layout from '../../layouts/UserLayout';
const Comprador = () => {
	return (
		<Layout>
            <div className='h-full'>
			<CompradorPerfil></CompradorPerfil>

            </div>
		</Layout>
	);
};

export default Comprador;
