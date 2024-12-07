import React from 'react';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  const { id } = useParams();

  // Asegúrate de manejar el caso donde no exista un id
  if (!id) {
    return <p>No se ha proporcionado un ID de usuario.</p>;
  }

  return (
    <div style={styles.container}>
      <h1>Perfil de {id}</h1>
      <p>Información detallada del usuario aparecerá aquí.</p>
    </div>
  );
};
export default UserProfile;
