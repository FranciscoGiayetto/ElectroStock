import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrito.css';
import CartCard from '../../components/cartcard/CartCard';
import Button from 'react-bootstrap/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { toast } from 'react-toastify';

import {
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import useAxios from "../../utils/useAxios";
import { useAuthStore } from '../../store/auth';
import { Navigate, useNavigate } from 'react-router-dom';

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> </link>
</head>

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

  const handleCommentChange = (id, newComment) => {
    console.log(`Changing comments for item ${id} to ${newComment}`);
    // Find the item in the shopping cart and update its comments
    const updatedCart = carrito.map(item => {
      if (item.id === id) {
        return {
          ...item,
          observation: newComment, // Update the observation in the shopping cart
        };
      }
      return item;
    });

    setCarrito(updatedCart);
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
    try {
      for (const item of carrito) {
        console.log(item);
        const updateData = {
          quantity: item.quantity,
          observation: item.observation,
        };
        console.log(updateData);
  
        try {
          // Realiza una solicitud PUT para actualizar el registro en el servidor
          await api.put(`/logCantidad/${item.id}/`, updateData);

      try {
        const response = await api.put(`/logPost/${userData.user_id}/`, { dateOut: dateInputData });
        console.log(response.data.response);
        navigate('/');
        toast.success('Préstamo solicitado!', { style:{marginTop:'3rem', marginBottom:'-2rem'} });
      } catch (error) {
        console.log(error);
        toast.warning('Ha ocurrido un error...', { style:{marginTop:'3rem', marginBottom:'-2rem'} });
      }
  
      console.log('Actualizaciones exitosas');
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar registros:', error);
      alert('No hay stock disponible');

    }
  }
  
        } catch (error) {
          // Maneja el error y muestra una alerta
          console.error('Error en la solicitud PUT:', error);
          alert('No hay stock disponible');
        }
      }
  
  const handleObservationChangeInCartCard = (id, newObservation) => {
        handleCommentChange(id, newObservation);
      };
  
  

  return (
    <section className="container-bg">
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <p style={{fontSize: '1.563rem'}}>
              <ShoppingCartOutlinedIcon style={{marginRight: '0.5rem'}}/>
              Carrito
            </p>

            {/* Renderizar los componentes CartCard */}

            {carrito.length > 0 ? (
        carrito.map((item) => (
          <CartCard
            key={item.id}
            id={item.id}
            name={item.box.name}
            title={item.box.element.name}
            image={item.box.image}
            quantity={item.quantity}
            comments={item.observation}
            handleDelete={handleDelete}
            handleQuantityChange={handleQuantityChange}
            handleCommentChange={handleObservationChangeInCartCard} // Ensure this line is correct
          />
        ))
      ) : (
        <p className="text-center">¡Agregá tu próximo pedido! </p>
      )}

            {/* Datetime Input */}
            <div className="mb-2 d-flex justify-content-between">
              <div>
                <label style={{marginRight:'0.3rem'}} htmlFor="datetimeInput" className="form-label">
                  Fecha de devolución:
                </label>
                
                <input
                  className='date-style'
                  type="date"
                  name="dateInput"
                  min={new Date().toISOString().split('T')[0]}
                  value={dateInputData}
                  onChange={(e) => setDateInputData(e.target.value)}
                />
              </div>
              <Button className='btn-style' onClick={handleContinue}>
                Siguiente
              </Button>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}

export default Carrito;