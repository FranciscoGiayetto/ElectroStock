import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAuthStore } from '../../store/auth';
import { getRefreshToken } from '../../utils/auth';
import useAxios from '../../utils/useAxios';
import defaultpicture from '../../assets/images/defaultpicture.png';
import './DetalleProducto.css';

function DetalleProducto() {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const [posRes, setPostRes] = useState('');
  const [element, setElement] = useState(null);
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);
  const numeroAleatorio = Math.floor(Math.random() * 21) + 5;
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const api = useAxios(); 
  const { id } = useParams();

  useEffect(() => {
    console.log(userData);
    getElement();
    handleLayoutChange();
    window.addEventListener('resize', handleLayoutChange);
    return () => {
      window.removeEventListener('resize', handleLayoutChange);
    };
  }, [id]);

  const getElement = async () => {
    try {
      const response = await api.get(`/elements/${id}/`);
      console.log(response);
      let data = await response.data;
      setElement(data);
      console.log(element);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      box: 1,
      borrower: 1,
      lender: null,
      status: 'CAR',
      quantity: 15,
      observation: null,
      dateIn: null,
      dateOut: null,
    };

    try {
      const response = await api.post('/prestamos/', body);
      setPostRes(response.data.response);
    } catch (error) {
      setPostRes(error.response.data);
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
              onClick={handleSubmit}
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
