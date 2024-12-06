import { BASE_URL } from "../environment";

export const RegisterUser = async ({
    nombre,
    contrasenia,
    longitud,
    latitud,
    correo,
    telefono,
    rol,
    foto,
    descripcion,
}) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre,
                contrasenia,
                longitud,
                latitud,
                correo,
                telefono,
                rol,
                foto,
                descripcion,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Usuario registrado:", data);

        return data; // Retornar la respuesta del servidor
    } catch (error) {
        console.error("Error registrando usuario:", error);
        return null;
    }
};

export const AuthenticateUser = async ({ correo, password }) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                correo,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Obtener el token como texto (JWT)
        const token = await response.text();
        console.log("JWT Token:", token);

        // Decodificar la carga útil (payload)
        const payload = decodeJwtPayload(token);
        console.log("Payload:", payload);

        return { token, payload }; // Retornar el JWT y la carga útil
    } catch (error) {
        console.error("Error autenticando usuario:", error);
        return null;
    }
};
