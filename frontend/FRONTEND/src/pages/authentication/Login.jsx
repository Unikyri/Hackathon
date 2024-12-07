import React, { useState, useContext } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '@nextui-org/spinner';
import { AuthenticateUser } from '../../services/AuthServices';
import { AuthContext } from '../../providers/AuthProvider';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { token, setToken, setUserRole, setSession } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Autenticación del usuario
			const { success, user, role, message } = await AuthenticateUser({
				correo: username,
				password,
			});

			if (success) {
				// Guardar los datos en el contexto y localStorage
				setUserRole(role);
				setSession(true);
				localStorage.setItem('role', role);
				localStorage.setItem('user', user);
				localStorage.setItem('session', true);

				// Redirigir según el rol
				switch (role) {
					case 'administrador':
						navigate('/admin');
						break;
					case 'comprador':
						navigate('/comprador');
						break;
					case 'vendedor':
						navigate('/vendedor');
						break;
					default:
						navigate('/home');
						break;
				}
			} else {
				// Mostrar mensaje de error
				alert(message);
			}
		} catch (error) {
			console.error('Error durante la autenticación:', error);
			alert('Hubo un error al intentar iniciar sesión.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-md w-full">
			<div className="flex justify-center mb-6">
				<img src="./logo-web.png" className="w-40 h-40" />
			</div>
			<h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
				Iniciar Sesión
			</h2>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<Input
					color="secondary"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Correo"
					required
					fullWidth
					size="lg"
					className="bg-gray-100 text-gray-200"
				/>
				<Input
					color="secondary"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Contraseña"
					required
					fullWidth
					size="lg"
					className="bg-red-50 text-red-200"
				/>
				<Button
					type="submit"
					color="secondary"
					size="lg"
					className="w-full bg-red-400 hover:bg-red-600 text-white"
				>
					{isLoading ? <Spinner color="white" /> : 'Ingresar'}
				</Button>
				<h2 className="text-2xl font-semibold text-center text-black mb-3">
					¿No tiene cuenta?
				</h2>
				<a href="/Register" className="text-center mb-3">
					Registrarse
				</a>
			</form>
		</div>
	);
}
