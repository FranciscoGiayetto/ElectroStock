import React from 'react';

import CardUser from '../../components/CardUser/CardUser.jsx';
import ListTable from '../../components/ListTable/Table.jsx';
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
        <CardUser></CardUser>
        <p>Mis Datos</p>
        <ListTable></ListTable>
        <p>Mis Prestamos</p>
        <CardUser></CardUser>
      </div>
    </div>
  );
}

export default DetalleCuenta;
