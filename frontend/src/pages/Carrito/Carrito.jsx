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
import { Navigate, useNavigate } from 'react-router-dom';

function Carrito() {
  const api = useAxios();
  const [carrito, setCarrito] = useState([]);
  const [dateInputData, setDateInputData] = useState([]);
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  const userData = user()
  const navigate = useNavigate();

  useEffect(() => {
    console.log('SE EJECUTO EL USE')
    getCarrito();
  }, []); // Agrega userData como dependencia

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

  const handleDelete = async (log_id) => {
    try {
      await api.delete(`/log/${log_id}`);
      getCarrito(); // Vuelve a obtener el carrito actualizado
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    console.log(`Changing quantity for item ${id} to ${newQuantity}`);
    // Find the item in the shopping cart and update its quantity
    const updatedCart = carrito.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setCarrito(updatedCart);
  };

  const handleContinue = async () => {
    let body = {  
      dateOut: dateInputData
    };
    try {
      const response = await api.put(`/logPost/${userData.user_id}/`, body);
      console.log(response.data.response);
      navigate('/'); // Navega a "/"
    } catch (error) {
      console.log(error);
    }
  }

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
                key={item.id}
                id={item.id}
                name={item.box.name}
                title={item.box.element.name}
                image={item.box.element.image}
                quantity={item.quantity}
                handleDelete={handleDelete}
                handleQuantityChange={handleQuantityChange}
              />
            ))}

            {/* Datetime Input */}
            <div className="mb-2 d-flex justify-content-between">
              <div>
                <label htmlFor="datetimeInput" className="form-label">
                  Fecha de devolución:
                </label>
                <input
                  type="date"
                  name="dateInput"
                  min={new Date().toISOString().split('T')[0]}
                  value={dateInputData}
                  onChange={(e) => setDateInputData(e.target.value)}
                />
              </div>
              <div>
                <button className="btn btn-primary btn-sm" onClick={handleContinue}>Continuar</button>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}

export default Carrito;
