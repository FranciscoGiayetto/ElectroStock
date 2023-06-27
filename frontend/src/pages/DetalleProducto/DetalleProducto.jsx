import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAuthStore } from '../../store/auth';
import { getRefreshToken } from '../../utils/auth';

import defaultpicture from '../../assets/images/defaultpicture.png';
import './DetalleProducto.css';

function DetalleProducto() {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  console.log(userData);

  const [element, setElement] = useState(null);
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);
  const numeroAleatorio = Math.floor(Math.random() * 21) + 5;
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getElement();
    handleLayoutChange();
    window.addEventListener('resize', handleLayoutChange);
    return () => {
      window.removeEventListener('resize', handleLayoutChange);
    };
  }, [id]);

  const getElement = async () => {
    const proxyUrl = 'http://127.0.0.1:8000';
    try {
      const response = await fetch(`${proxyUrl}/api/elements/${id}/`);
      if (response.ok) {
        const data = await response.json();
        setElement(data);
      } else {
        throw new Error('Error al obtener el elemento');
      }
    } catch (error) {
      console.error(error);
    }
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
      borrower: null,
      lender: null,
      status: 'CAR',
      quantity: quantity,
      observation: null,
      dateIn: null,
      dateOut: null,
    };

    const token = userData.token
    if (token) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      };

      fetch('http://127.0.0.1:8000/auth/test/', {
        method: 'GET',
        headers: headers,
       // body: JSON.stringify(logData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al crear el log');
          }
        })
        .then((data) => {
          console.log('Log creado:', data);
          navigate('/carrito');
        })
        .catch((error) => {
          console.error('Error al crear el log:', error);
        });
    } else {
      console.error('Las credenciales de autenticación no se proveyeron.');
    }
  };

  return (
    <div className='container pagecontainer'>
      {element && (
        <div className={`row product-details ${isVerticalLayout ? 'vertical-layout' : ''}`}>
          <div className='col-md-6 product-details__image-container'>
            <img src={element.image || defaultpicture} alt='Imagen' className='img-fluid product-details__image' />
          </div>

          <div className='col-md-6 product-details__info-container' style={{ width: '45%' }}>
            <h1 className='product-details__title'>Nombre: {element.name}</h1>
            <h1 className='product-details__description'>Descripción: {element.description}</h1>
            <h1 className='product-details__category'>Categoría: {element.category}</h1>
            <h1 className='product-details__stock'>Stock: 20</h1>

            <div className='input-group input-group-sm'>
              <span className='input-group-btn'>
                <Button variant='secondary' size='sm' onClick={handleDecrement}>
                  -
                </Button>
              </span>
              <input type='number' className='form-control form-control-sm' value={quantity} readOnly />
              <span className='input-group-btn'>
                <Button variant='secondary' size='sm' onClick={handleIncrement}>
                  +
                </Button>
              </span>
            </div>
            <Button
              className='botonCarrito'
              size='lg'
              style={{ backgroundColor: '#58A4B0', border: '1px solid #58A4B0' }}
              variant='primary'
              type='submit'
              onClick={handleCarrito}
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      )}
      <div className={`product-details__separator ${isVerticalLayout ? 'vertical-separator' : ''}`}></div>
    </div>
  );
}

export default DetalleProducto;
