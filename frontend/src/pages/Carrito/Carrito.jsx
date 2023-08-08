import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrito.css';
import CartCard from '../../components/cartcard/CartCard';
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  } from "mdb-react-ui-kit";

function Carrito() {
  return (
    <section className="container-bg" style={{ backgroundColor: "white"}}>
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <p>
              <span className="h2">Shopping Cart </span>
            </p>

            
            <CartCard/>
            <CartCard/>
            <CartCard/>
            <CartCard/>
            <CartCard/>
            <CartCard/>
            <CartCard/>
            <CartCard/>
            <CartCard/>
            <CartCard/>

        <div className="d-flex justify-content-end">
              <button className="btn btn-primary btn-sm">Continuar</button>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}
export default Carrito;
