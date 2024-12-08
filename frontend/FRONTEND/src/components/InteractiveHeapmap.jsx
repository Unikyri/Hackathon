import React, { useEffect, useRef, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { getUsersData } from '../services/UserServices';

mapboxgl.accessToken =
	'pk.eyJ1IjoiaGVybmFuZHFnIiwiYSI6ImNtNGJyZXY1OTAwZ3YyanB5bTdkdnE2aWoifQ.J1rmncwLx3ryA3l_XwAL0A';

export const InteractiveHeapmap = () => {
	const mapContainerRef = useRef(null);
	const mapRef = useRef(null);
	const [places, setPlaces] = useState([]);
  
	// JSON local con ubicaciones simuladas
	const mockPlaces = [
	  { latitude: 4.15, longitude: -73.63, density: 2 }, // Villavicencio
	  { latitude: 4.08, longitude: -73.61, density: 5 }, // Meta cercano
	  { latitude: 4.13, longitude: -73.70, density: 3 }, // Otro lugar
	  { latitude: 4.25, longitude: -73.55, density: 1 }, // Más al norte
	  { latitude: 4.10, longitude: -73.75, density: 4 }, // Más al sur
	];
  
	// Comentar la línea siguiente cuando se use el servicio real
	useEffect(() => setPlaces(mockPlaces), []);
  
	// Descomentar este bloque cuando se tenga el servicio real
	/*
	useEffect(() => {
	  const fetchUserData = async () => {
		try {
		  const response = await fetch("URL_DEL_SERVICIO");
		  const data = await response.json();
  
		  const transformedPlaces = data.usuarios.map((usuario) => ({
			latitude: usuario.Latitud,
			longitude: usuario.Longitud,
			density: usuario.Densidad || 1,
		  }));
  
		  setPlaces(transformedPlaces);
		} catch (error) {
		  console.error("Error al obtener los datos del servicio:", error);
		}
	  };
  
	  fetchUserData();
	}, []);
	*/
  
	// Inicializa el mapa y agrega capa de calor
	useEffect(() => {
	  if (!mapRef.current) {
		mapRef.current = new mapboxgl.Map({
		  container: mapContainerRef.current,
		  style: "mapbox://styles/mapbox/outdoors-v12",
		  center: [-73.6369, 4.1252],
		  zoom: 7,
		  maxBounds: [
			[-74.5, 3.5],
			[-72.5, 5.5],
		  ],
		});
  
		mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  
		// Agregar capa de calor
		mapRef.current.on("load", () => {
		  const geojsonData = {
			type: "FeatureCollection",
			features: places.map((place) => ({
			  type: "Feature",
			  geometry: {
				type: "Point",
				coordinates: [place.longitude, place.latitude],
			  },
			  properties: {
				density: place.density,
			  },
			})),
		  };
  
		  mapRef.current.addSource("heatmapData", {
			type: "geojson",
			data: geojsonData,
		  });
  
		  mapRef.current.addLayer({
			id: "heatmapLayer",
			type: "heatmap",
			source: "heatmapData",
			paint: {
			  "heatmap-intensity": [
				"interpolate",
				["linear"],
				["zoom"],
				0,
				1,
				15,
				3,
			  ],
			  "heatmap-radius": [
				"interpolate",
				["linear"],
				["zoom"],
				0,
				2,
				15,
				20,
			  ],
			  "heatmap-color": [
				"interpolate",
				["linear"],
				["heatmap-density"],
				0,
				"rgba(33,102,172,0)",
				0.2,
				"rgb(103,169,207)",
				0.4,
				"rgb(209,229,240)",
				0.6,
				"rgb(253,219,199)",
				0.8,
				"rgb(239,138,98)",
				1,
				"rgb(178,24,43)",
			  ],
			},
		  });
		});
	  }
  
	  return () => {
		if (mapRef.current) {
		  mapRef.current.remove();
		  mapRef.current = null;
		}
	  };
	}, [places]);
  
	return (<div ref={mapContainerRef} className="h-full w-full" />);
  }

export default InteractiveHeapmap;
