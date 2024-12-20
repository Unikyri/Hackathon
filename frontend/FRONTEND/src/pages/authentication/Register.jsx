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

import { BASE_URL, ROLES } from '../../environment/index';

export default function Register() {
	const [userData, setUserData] = useState({
		nombre: '',
		rol: '',
		telefono: null,
		correo: '',
		contraseña: '',
		latitude: '',
		longitud: '',
		imagen: null,
		descripcion: '',
	});

	// Arreglo de coordenadas
	const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

	// Función para obtener las coordenadas del usuario
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
					console.error('Error obteniendo las coordenadas: ', error);
					alert('No se pudieron obtener las coordenadas.');
				}
			);
		} else {
			alert('La geolocalización no es soportada por este navegador.');
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

		const { nombre, rol, telefono, correo, contraseña, latitude, longitude, imagen, descripcion } = userData;

		const requestBody = {
			nombre: nombre,
			rol: rol, // Se asume que rol es un string ya
			telefono: telefono,
			correo: correo,
			contraseña: contraseña,
			latitude: coordinates.latitude,
			longitude: coordinates.longitude,
			imagen: imagen,
			descripcion: descripcion,
		};

		console.log(requestBody);

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
				alert('Su registro fue exitoso.');
			} else {
				console.error('Error en la solicitud', response.statusText);
			}
		} catch (error) {
			console.error('Error de red', error);
		}
	};

	return (
		<div className="container bg-gray mx-auto p-4">
			<Card className="max-w-2xl mx-auto bg-white shadow-lg">
				<CardHeader className="flex flex-col items-center px-6 py-4">
					<h1 className="text-2xl font-bold text-blue-600">Registro</h1>
					<p className="text-blue-500">
						Regístrate para conectarte con vendedores o compradores.
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
							className="text-black"
						/>

						<Select
							label="Rol"
							placeholder="Selecciona un tipo"
							value={userData.rol}
							onChange={(e) => handleSelectChange('rol', e.target.value)}
							required
							className="bg-gray-100 "
						>
							{ROLES.map((tipo, index) => (
								<SelectItem className="text-black hover:bg-gray-700" key={index} value={tipo}>
									{typeof tipo === 'string'
										? tipo.charAt(0).toUpperCase() + tipo.slice(1)
										: tipo}
								</SelectItem>
							))}
						</Select>

						<Input
							label="Telefono"
							type='number'
							name="telefono"
							placeholder="Ej: 3333333333"
							value={userData.telefono}
							onChange={handleInputChange}
							required
							className="text-black"
						/>

						<Input
							label="Correo"
							name="correo"
							placeholder="exmple@example.com"
							value={userData.correo}
							onChange={handleInputChange}
							required
							className="text-black"
						/>

						<Input
							label="Contraseña"
							name="contraseña"
							type='password'
							placeholder="*******"
							value={userData.contraseña}
							onChange={handleInputChange}
							required
							className="text-black"
						/>

						<Input
							label="Descripción"
							name="descripcion"
							placeholder="Agregue una descripción de su perfil y sus productos o compras..."
							value={userData.descripcion}
							onChange={handleInputChange}
							className="text-black"
						/>

						<div className="flex flex-row items-center justify-center bg-gray-100">
							<button
								type="button"
								onClick={getCoordinates}
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
