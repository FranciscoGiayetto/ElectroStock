import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import officeImage from './office.jpg';
import './HomePage.css'
import CardPrestamos from './CardPrestamos';
import CardVencidos from './CardVencidos';
import CardPendientes from './CardPendientes';
import { useAuthStore } from '../../store/auth';
import { getCurrentToken } from '../../utils/auth';
function HomePage() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
]);


  const token = getCurrentToken()
  const userData = user()
  console.log(token.PromiseResult)



  
  return (
    <div className='container pagecontainer'>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <CardVencidos />
        <CardPendientes />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CardPrestamos />
      </div>
    </div>
  );
}

export default HomePage;
