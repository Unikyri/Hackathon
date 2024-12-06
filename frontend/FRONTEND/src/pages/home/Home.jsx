import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVybmFuZHFnIiwiYSI6ImNtNGJyZXY1OTAwZ3YyanB5bTdkdnE2aWoifQ.J1rmncwLx3ryA3l_XwAL0A';

const MapComponent = () => {
	const mapContainerRef = useRef(null);
	const mapRef = useRef(null); // Para almacenar la instancia del mapa
	const [coordinates, setCoordinates] = useState(null); // Inicialmente null
  
	useEffect(() => {
	//   Obtener las coordenadas del equipo
	  navigator.geolocation.getCurrentPosition(
		(position) => {
		  const { latitude, longitude } = position.coords;
		  setCoordinates({ latitude, longitude });
		},
		(error) => {
		  console.error("Error obteniendo la ubicación:", error);
		  alert("No se pudieron obtener las coordenadas.");
		}
	  );
	}, []);
  
	useEffect(() => {
	  // Inicializar el mapa una vez que se tengan las coordenadas
	  if (coordinates && !mapRef.current) {
		mapRef.current = new mapboxgl.Map({
		  container: mapContainerRef.current,
		  style: 'mapbox://styles/mapbox/streets-v11',
		  center: [coordinates.longitude, coordinates.latitude], // Usar coordenadas
		  zoom: 9,
		});
  
		// Agregar marcador al mapa
		new mapboxgl.Marker()
		  .setLngLat([coordinates.longitude, coordinates.latitude]) // Coordenadas del marcador
		  .addTo(mapRef.current); // Agregar al mapa
	  }
  
	  return () => {
		// Limpia el mapa al desmontar el componente
		if (mapRef.current) {
		  mapRef.current.remove();
		  mapRef.current = null;
		}
	  };
	}, [coordinates]);
  
	return (
	  <div className="h-full w-full">
		<div ref={mapContainerRef} className="h-full w-full" />
	  </div>
	);
  };
  
  export default MapComponent;