import {
	Link,
	Button,
} from '@nextui-org/react';
import Layout from '../../layouts/ExternalLayout';
import {InteractiveHeapmap} from '../../components/InteractiveHeapmap';

const Externo = () => {
  return (
    <Layout>
        <main className="px-6 py-12">
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir Meating?</h2>
          <p className="text-lg">
            Optimiza la comercialización de carne, reduce costos y asegura la calidad con nuestra plataforma innovadora.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">🌍 Conecta con los más cercanos</h3>
            <p>
              Encuentra compradores y vendedores locales en un mapa interactivo, reduciendo costos de transporte y
              manteniendo la cadena de frío.
            </p>
          </div>
          <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center">
            <InteractiveHeapmap />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
          <div className="order-2 md:order-1 w-full h-48 rounded-lg flex items-center justify-center">
            {/* <span>Espacio para imagen de un perfil con calificaciones</span> */}
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">⭐ Confianza y transparencia</h3>
            <p>
              Accede a perfiles detallados con calificaciones y comentarios. Compra y vende con confianza en nuestra
              comunidad verificada.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="w-full h-48 rounded-lg flex items-center justify-center">
            {/* <span>Espacio para imagen de productos</span> */}
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2">📢 Publicaciones y productos</h3>
            <p>
              Explora publicaciones de productos a la venta, contacta directamente y haz crecer tu red de negocios en
              el Meta.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Comienza hoy</h2>
        <p className="mb-4">Regístrate y forma parte de la comunidad que transforma el comercio de carne en el Meta.</p>
        <Button 
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-100"
          as={Link}
					href="/register"
        >
          Unirme ahora
        </Button>
      </footer>
      
    </Layout>
  );
};

export default Externo;
