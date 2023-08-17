import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrito.css'
import CartCard from '../../components/cartcard/CartCard';

function Carrito() {
  return (
    <div>
      <div className='container container-background'>
        <div>
          <h1>Mi carrito de compras</h1>
          <hr></hr>
        </div>

        <CartCard/>

          <div className='div-btn'>
            <button type="submit" className="btn btn-primary boton">pagar</button>
          </div>
        </div>
        
      </div>
  )
}
export default Carrito;
