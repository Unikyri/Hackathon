import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { name } = useParams();

  return (
    <div className='pd-16 bg-gray-50 border-r-8'>
      <h1 className='bg-blue'>Perfil de {name}</h1>
      <p className='color-black'>Información detallada del usuario aparecerá aquí.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default UserProfile;