import { BASE_URL } from "../environment";

// Función para obtener el usuario con el id proporcionado
export const getUserData = async (id) => {
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

    