import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import UserCard from '../../components/user/userCard';

const FavouritesSeller = () => {
  const users = [
    {
      name: 'juan123',
      photoUrl: 'https://via.placeholder.com/150',
      productName: 'Café orgánico',
      rating: 4.5,
    },
    {
      name: 'maria456',
      photoUrl: 'https://via.placeholder.com/150',
      productName: 'Miel de abejas',
      rating: 4.8,
    },
  ];

  return (
    <UserLayout>
      <div className='h-full w-full'>
        {users.map((user) => (
          <UserCard
            key={user.name}
            name={user.name}
            photoUrl={user.photoUrl}
            productName={user.productName}
            rating={user.rating}
          />
        ))}
      </div>
    </UserLayout>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#f5f5f5',
  },
};

export default FavouritesSeller;