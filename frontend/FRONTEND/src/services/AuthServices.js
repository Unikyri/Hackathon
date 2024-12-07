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

        // Obtener la respuesta JSON que contiene el mensaje, rol y usuario
        const data = await response.json();

        if (data.message === "inicio de sesión exitoso") {
            console.log("Usuario autenticado:", data);
            return {
                success: true,
                user: data.user,
                role: data.rol,
            };
        } else {
            console.error("Error en la autenticación:", data.message);
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error("Error autenticando usuario:", error);
        return { success: false, message: "Hubo un error al autenticar al usuario" };
    }
};
