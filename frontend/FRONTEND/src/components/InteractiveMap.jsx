import React, { useEffect, useRef, useState , useContext } from "react";
import mapboxgl from "mapbox-gl";
import { getUsersData } from "../services/UserServices"; // Ajusta la ruta de importación
import { AuthContext } from '../providers/AuthProvider';

mapboxgl.accessToken = "pk.eyJ1IjoiaGVybmFuZHFnIiwiYSI6ImNtNGJyZXY1OTAwZ3YyanB5bTdkdnE2aWoifQ.J1rmncwLx3ryA3l_XwAL0A";

const InteractiveMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const {id , session} = useContext(AuthContext);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [places, setPlaces] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  

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

  // Llamar al servicio para obtener datos
  useEffect(() => {
    console.log(id, session)
    const fetchUserData = async () => {
      try {
        const data = await getUsersData(id);
        const { ubicacion_usuario, usuarios } = data;

        // Actualizar coordenadas del usuario principal
        if (ubicacion_usuario) {
          setUserCoordinates({
            latitude: ubicacion_usuario.latitud,
            longitude: ubicacion_usuario.longitud,
          });
        }

        // Transformar usuarios en el formato necesario para 'places'
        const transformedPlaces = usuarios.map((usuario) => ({
          latitude: usuario.Latitud,
          longitude: usuario.Longitud,
          name: usuario.Nombre,
          imageUrl: usuario.Foto || "https://cdn-icons-png.flaticon.com/512/219/219983.png", // Imagen por defecto
        }));

        setPlaces(transformedPlaces);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  // Inicializar el mapa y agregar marcadores
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: userCoordinates
          ? [userCoordinates.longitude, userCoordinates.latitude]
          : [-73.6369, 4.1252],
        zoom: 11,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    }

    if (userCoordinates && !hasAnimated) {
      mapRef.current.flyTo({
        center: [userCoordinates.longitude, userCoordinates.latitude],
        zoom: 13,
        speed: 1.5,
        essential: true,
      });
      setHasAnimated(true);
    }
    console.log(places)
    // Agregar marcadores dinámicamente
    places.forEach((location) => {
      const { latitude, longitude, name, imageUrl } = location;

      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.backgroundImage = `url(${imageUrl})`;
      el.style.width = "40px";
      el.style.height = "40px";
      el.style.backgroundSize = "cover";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="popup-card">
          <img src="${imageUrl}" alt="${name}" style="width: 50px; height: 50px; border-radius: 50%;" />
          <p>${name}</p>
        </div>
      `);

      marker.getElement().addEventListener("mouseenter", () => popup.addTo(mapRef.current));
      marker.getElement().addEventListener("mouseleave", () => popup.remove());

      marker.getElement().addEventListener("click", () => {
        window.location.href = `http://localhost:5173/profile/${name}`;
        console.log("Redirigiendo a:", `http://localhost:5173/profile/${name}`);
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [userCoordinates, places]);

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
    <div className="relative h-96 w-full">
      <div ref={mapContainerRef} className="h-full w-full" />
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
