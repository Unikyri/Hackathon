import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVybmFuZHFnIiwiYSI6ImNtNGJyZXY1OTAwZ3YyanB5bTdkdnE2aWoifQ.J1rmncwLx3ryA3l_XwAL0A';

// useEffect(() => {
//   // Consumir el servicio del backend
//   fetch('https://tu-backend/api/locations') // Reemplaza con la URL real de tu servicio
//     .then((response) => response.json())
//     .then((data) => setLocations(data))
//     .catch((error) => console.error('Error al obtener las ubicaciones:', error));
// }, []);

const places = [
  {
    latitude: 4.1252,
    longitude: -73.6369,
    name: "Vendedor1",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
  },
  {
    latitude: 4.1403,
    longitude: -73.6521,
    name: "Vendedor2",
    imageUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
  },
  {
    latitude: 4,
    longitude: -73.6196,
    name: "Vendedor3",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg",
  },
];

const InteractiveMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [userCoordinates, setUserCoordinates] = useState(null);

  // Obtener coordenadas del equipo
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoordinates({ latitude, longitude });
      },
      (error) => {
        console.error("Error obteniendo la ubicación del equipo:", error);
        alert("No se pudo obtener la ubicación del equipo.");
      }
    );
  }, []);

  // Inicializar el mapa y agregar marcadores
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v12', // Estilo sin etiquetas
        center: userCoordinates
          ? [userCoordinates.longitude, userCoordinates.latitude]
          : [-73.6369, 4.1252], // Centro inicial (Villavicencio)
        zoom: 11,
      });

      // Agregar controles de zoom
      mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    // Agregar marcador para la ubicación del equipo
    if (userCoordinates) {
      const userMarkerEl = document.createElement('div');
      userMarkerEl.className = 'user-marker';
      userMarkerEl.style.backgroundColor = 'blue';
      userMarkerEl.style.width = '50px';
      userMarkerEl.style.height = '50px';
      userMarkerEl.style.borderRadius = '50%';
      userMarkerEl.style.border = '3px solid white';

      new mapboxgl.Marker(userMarkerEl)
        .setLngLat([userCoordinates.longitude, userCoordinates.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML('<p>¡Aquí estás tú!</p>')
        )
        .addTo(mapRef.current);
    }

    // Agregar marcadores para otras ubicaciones
    places.forEach((location) => {
      const { latitude, longitude, name, imageUrl} = location;

      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundImage = `url(${imageUrl})`;
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundSize = 'cover';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="popup-card">
          <img src="${imageUrl}" alt="${name}" style="width: 50px; height: 50px; border-radius: 50%;" />
          <p>${name}</p>
        </div>
      `);

      marker.getElement().addEventListener('mouseenter', () => popup.addTo(mapRef.current));
      marker.getElement().addEventListener('mouseleave', () => popup.remove());

      marker.getElement().addEventListener('click', () => {
        window.location.href = `http://localhost:5173/profile/${name}`;
        console.log('Redirigiendo a:', `http://localhost:5173/profile/${name}`);
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [userCoordinates]);

  // Función para centrar en la ubicación del equipo
  const goToUserLocation = () => {
    if (userCoordinates && mapRef.current) {
      mapRef.current.flyTo({
        center: [userCoordinates.longitude, userCoordinates.latitude],
        zoom: 13,
        essential: true,
      });
    } else {
      alert("Ubicación del equipo no disponible.");
    }
  };

  return (
    <div className="relative h-96 w-full ">
      <div ref={mapContainerRef} className=" h-full w-full place-content-center" />
      <button
        onClick={goToUserLocation}
        className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
      >
        Volver a mi ubicación
      </button>
    </div>
  );
};

export default InteractiveMap;