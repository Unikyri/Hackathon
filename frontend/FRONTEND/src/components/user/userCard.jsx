import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ name, photoUrl, productName, rating }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirige al perfil del usuario
    navigate(`/${name}`);
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <img src={photoUrl} alt={`${name}'s avatar`} style={styles.photo} />
      <div style={styles.infoContainer}>
        <h2 style={styles.name}>{name}</h2>
        <p style={styles.product}>{productName}</p>
        <p style={styles.rating}>Calificación: {rating}/5</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',
    margin: '8px 16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
  photo: {
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    marginRight: '16px',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  product: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '4px',
  },
  rating: {
    fontSize: '14px',
    color: '#888',
  },
};

export default UserCard;