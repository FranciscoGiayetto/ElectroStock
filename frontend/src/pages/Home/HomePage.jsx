import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import officeImage from './office.jpg';
import './HomePage.css'
import CardVencidos from './CardVencidos';
import { useAuthStore } from '../../store/auth';
function HomePage() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
]);
  const userData = user()
  console.log(userData)
  return (
    <div className='container pagecontainer'>
      <div>
        <CardVencidos></CardVencidos>
        <h1>Bienvenido {userData.username} </h1>
      </div>
    
    </div>
  );
}

export default HomePage;
