import React, { useState } from 'react';
import {
	Button,
	Input,
	Select,
	SelectItem,
	Card,
	CardBody,
	CardHeader,
} from '@nextui-org/react';
import { RegisterUser } from '../../services/AuthServices';

import {BASE_URL, ROLES} from '../../environment/index';

export default function RegisterPage() {
	const [userData, setUserData] = useState({
			nombre: '', 
			rol: '',
			telefono: null,
			correo: '',
			contraseña: '',
			latitude: '',
			longitud: '',
			imagen: null,
			descripcion: ''
	});

	// Arreglos de valores para los Selects
	// const roles = ['Comprador', 'Vendedor'];

	const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  const getCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo las coordenadas: ", error);
          alert("No se pudieron obtener las coordenadas.");
        }
      );
    } else {
      alert("La geolocalización no es soportada por este navegador.");
    }
  };

	const handleInputChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSelectChange = (field, value) => {
		setUserData({ ...userData, [field]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
<<<<<<< HEAD
	
		const { nombre, rol, telefono, correo, contraseña, imagen, descripcion } = userData;
		const { latitude, longitude } = coordinates;
	
		// Llamada al servicio RegisterUser
		const response = await RegisterUser({
		  nombre,
		  contrasenia: contraseña,
		  longitud: longitude,
		  latitud: latitude,
		  correo,
		  telefono,
		  rol,
		  foto: imagen, // Asegúrate de manejar la foto si la subes
		  descripcion
		});
	
		if (response) {
		  alert('Registro exitoso: ' + response.message);
		} else {
		  alert('Error al registrar el usuario.');
=======

		const { nombre, rol, telefono, correo, contraseña, latitude, longitude, imagen, descripcion } = userData;

		const requestBody = {
			nombre: nombre, 
			rol: roles[rol],
			telefono: telefono,
			correo: correo,
			contraseña: contraseña,
			latitude: coordinates.latitude,
			longitude: coordinates.longitude, 
			imagen: imagen,
			descripcion: descripcion
		};

		{console.log(requestBody)};
		
		try {
			const response = await fetch(`${BASE_URL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			});

			if (response.ok) {
				console.log('Solicitud exitosa', await response.json());
				Alert.alert("Su registro fue exitoso.")
			} else {
				console.error('Error en la solicitud', response.statusText);
			}
		} catch (error) {
			console.error('Error de red', error);
>>>>>>> d481c28a991d206e966435a4a9be2d999384d7f1
		}
	  };

	return (
		<div className="container bg-gray mx-auto p-4">
			<Card className="max-w-2xl mx-auto bg-white shadow-lg"> 
				<CardHeader className="flex flex-col items-center px-6 py-4">
					<h1 className="text-2xl font-bold text-blue-600">Registro</h1>
					<p className="text-blue-500">
						Regístrate para conectarte con proveedores o compradores.
					</p>
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit} className="space-y-6">
						<Input
							label="Nombre"
							name="nombre"
							type="text"
							placeholder="Pepito Perez"
							value={userData.nombre}
							onChange={handleInputChange}
							required
							className="bg-white"
						/>
	
						<Select
							label="Rol"
							placeholder="Selecciona un tipo"
							value={userData.rol}
							onChange={(e) => handleSelectChange('rol', e.target.value)}
							required
							className="bg-gray-100 "
						>
<<<<<<< HEAD
							{roles.map((tipo, index) => (
								<SelectItem className=' bg-pink text-black hover:bg-gray-700' key={index} value={tipo}>
=======
							{ROLES.map((tipo, index) => (
								<SelectItem className=' bg-pink hover:bg-gray-700' key={index} value={tipo}>
>>>>>>> d481c28a991d206e966435a4a9be2d999384d7f1
									{tipo.charAt(0).toUpperCase() + tipo.slice(1)}
								</SelectItem>
							))}
						</Select>
	
						<Input
							label="Telefono"
							name="telefono"
							placeholder="Ej: 3333333333"
							value={userData.telefono}
							onChange={handleInputChange}
							required
							className="bg-white-100"
						/>
	
						<Input
							label="Correo"
							name="correo"
							placeholder="exmple@example.com"
							value={userData.correo}
							onChange={handleInputChange}
							required
							className="bg-white-100"
						/>

						<Input
							label="Contraseña"
							name="contraseña"
							placeholder="*******"
							value={userData.contraseña}
							onChange={handleInputChange}
							required
							className="bg-white-100"
						/>

						<Input
							label="Descripción"
							name="descripcion"
							placeholder="Agregue una descripción de su perfil y sus productos o compras..."
							value={userData.descripcion}
							onChange={handleInputChange}
							className="bg-white-100"
						/>

						<div className="flex flex-row items-center justify-center bg-gray-100">
							<button
								onClick={handleInputChange(getCoordinates)}
								className="px-2 py-2 mg-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
							>
								Obtener dirección
							</button>
						</div>	
	
						<Button type="submit" className="w-full bg-gray-500 hover:bg-green-700 text-white"> 
							Registrarse
						</Button>
					</form>
				</CardBody>
			</Card>
		</div>
	);
}
