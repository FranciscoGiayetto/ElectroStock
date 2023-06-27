import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import defaultpicture from '../../assets/images/defaultpicture.png';
import './DetalleProducto.css';
import Button from 'react-bootstrap/Button';
import { useAuthStore } from '../../store/auth';
<<<<<<< HEAD

function DetalleProducto() {
  
  const [ user] = useAuthStore((state) => [
    
    state.user,
]);
 
  const userData = user()
  console.log(userData)





=======



function DetalleProducto() {
  const [user] = useAuthStore((state) => [
    state.user,
  ]);
  const userData = user()
  console.log(userData)
>>>>>>> Develop
  const elementId = useParams();
  const [element, setElement] = useState(null);
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);
  const numeroAleatorio = Math.floor(Math.random() * 21) + 5;
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getElement();
    handleLayoutChange(); // Verificar el diseño inicial al cargar el componente
    window.addEventListener('resize', handleLayoutChange); // Manejar cambios de diseño en el redimensionamiento de la ventana
    return () => {
      window.removeEventListener('resize', handleLayoutChange); // Limpiar el event listener al desmontar el componente
    };
  }, [elementId]);

  const getElement = async () => {
    const proxyUrl = 'http://127.0.0.1:8000';
    let response = await fetch(`${proxyUrl}/api/elements/${elementId.id}/`);
    let data = await response.json();
    setElement(data);
  };

  const handleLayoutChange = () => {
    const isMobileLayout = window.innerWidth < 768;
    setIsVerticalLayout(!isMobileLayout);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCarrito = () => {
    const logData = {
      box: element.box,
      borrower: null, // Dejar que el backend establezca el borrower en función del usuario logeado
      lender: null,
      status: "CAR",
      quantity: quantity,
      observation: null,
      dateIn: null,
      dateOut: null
    };

    // Enviar la solicitud al backend para crear el log
    fetch('http://127.0.0.1:8000/api/prestamos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Log creado:', data);
        // Lógica adicional después de crear el log
        // Por ejemplo, redirigir al usuario a la página del carrito
        navigate('/carrito');
      })
      .catch(error => {
        console.error('Error al crear el log:', error);
        // Manejo de errores
      });
  };

  return (
    <div className='container pagecontainer'>
      {element && (
        <div className={`row product-details ${isVerticalLayout ? 'vertical-layout' : ''}`}>
          <div className='col-md-6 product-details__image-container'>
            <img
              src={element.image || defaultpicture}
              alt='Imagen'
              className='img-fluid product-details__image'
            />
          </div>

          <div className='col-md-6 product-details__info-container' style={{ width: '45%' }}>
            <h1 className='product-details__title'>Nombre: {element.name}</h1>
            <h1 className='product-details__description'>Descripción: {element.description}</h1>
            <h1 className='product-details__category'>Categoría: {element.category}</h1>
            <h1 className='product-details__stock'>Stock:20</h1>

            <div className="input-group input-group-sm">
              <span className="input-group-btn">
                <Button variant="secondary" size="sm" onClick={handleDecrement}>-</Button>
              </span>
              <input type="number" className="form-control form-control-sm" value={quantity} readOnly />
              <span className="input-group-btn">
                <Button variant="secondary" size="sm" onClick={handleIncrement}>+</Button>
              </span>
            </div>
            <Button className='botonCarrito ' size='lg' style={{ backgroundColor: '#58A4B0', border: '1px solid #58A4B0' }} variant="primary" type="submit" onClick={handleCarrito}>
              Agregar al carrito
            </Button>

          </div>
        </div>
      )}
      <div className={`product-details__separator ${isVerticalLayout ? 'vertical-separator' : ''}`}></div>
    </div>
  );
}

DetalleProducto.propTypes = {};

export default DetalleProducto;
