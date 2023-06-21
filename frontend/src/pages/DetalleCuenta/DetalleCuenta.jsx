import React from 'react';


import './DetalleCuenta.css'
import { useAuthStore } from '../../store/auth';


function DetalleCuenta() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
]);
  const userData = user()
  console.log(userData)
  return (
    <div className='container pagecontainer'>
      <div>
        <h1>Informacion de tu cuenta</h1>
        <h1>{userData.username} </h1>
      </div>
      <div>
      
    </div>
    </div>
  );
}

export default DetalleCuenta;
