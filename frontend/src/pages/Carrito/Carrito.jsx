import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrito.css'
import CartCard from '../../components/cartcard/CartCard';

function Carrito() {
  return (
    <div>
      <div className='container container-background'>
          <CartCard/>
        </div>
      </div>
  )
}
export default Carrito;
