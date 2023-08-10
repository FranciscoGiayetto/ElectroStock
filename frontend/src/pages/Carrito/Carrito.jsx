import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrito.css';
import CartCard from '../../components/cartcard/CartCard';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  } from "mdb-react-ui-kit";
import useAxios from "../../utils/useAxios";
import { useAuthStore } from '../../store/auth';

function Carrito() {
  const api = useAxios(); 
  const [carrito, setCarrito] = useState(null);
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
]);
  const userData = user()

  useEffect(() => {
    
    getCarrito();
  }, []);

  const getCarrito = async () => {
    try {
      console.log(userData.user_id)
      const response = await api.get(`/carrito/${userData.user_id}`);
      let data = await response.data;
      setCarrito(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container-bg" style={{ backgroundColor: "white"}}>
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <p>
              <span className="h2">Shopping Cart</span>
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
