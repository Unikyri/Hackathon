import { BASE_URL } from "../environment";

// Función para obtener el usuario con el id proporcionado
export const getUsersData = async (id) => {
  const url = `${BASE_URL}/userMap?id=${id}`;
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los datos del usuario");
    }

    const data = await response.json();
    
    // Regresa el objeto de datos
    return data;
  } catch (error) {
    console.error("Error en la petición GET:", error);
    throw error;
  }
};

// Función para obtener el usuario con el id proporcionado
export const getUserPerfil = async (id) => {
    const url = `${BASE_URL}/profile?id=${id}`; // La URL con el parámetro 'id'
  
    try {
      // Realizamos la solicitud GET
      const response = await fetch(url, {
        method: "GET", // Especificamos que es una solicitud GET
        headers: {
          "Content-Type": "application/json", // Indicamos que esperamos un JSON en la respuesta
        },
      });
  
      // Verificamos si la respuesta fue exitosa (status 200-299)
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
  
      // Parseamos la respuesta JSON
      const data = await response.json();
      
      // Retornamos los datos obtenidos
      return data;
    } catch (error) {
      // Manejamos errores de la petición o de parseo
      console.error("Error en la petición GET:", error);
      throw error;
    }
  };

    