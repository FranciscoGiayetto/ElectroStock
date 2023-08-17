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
  const [carrito, setCarrito] = useState([]);
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

            {/* Renderizar los componentes CartCard */}
            {carrito.map(item => (
              <CartCard
                key={item.box.id}
                id={item.box.id}
                name={item.box.name}
                title={item.box.element.name}
                image={item.box.element.image}
                quantity={item.quantity}
              />
            ))}
            

            {/* Datetime Input */}
            <div className="mb-2 d-flex justify-content-between">
    <div>
        <label htmlFor="datetimeInput" className="form-label">
            Fecha:
        </label>
        <input type="date" name="dateInput" />
    </div>
    <div>
        <button className="btn btn-primary btn-sm">Continuar</button>
    </div>
</div>


          
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}

export default Carrito;
