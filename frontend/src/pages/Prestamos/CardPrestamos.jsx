// CardPrestamos.jsx

import React from 'react';
import './PrestamosCard.css'; // Importa tu archivo CSS
import defaultpicture from '../../assets/images/defaultpicture.png';

const PrestamosCard = ({ status, cliente, monto, fecha }) => {
  return (
    <div className='prestamo-card'>
        <div className='img-container'>
        <img src={defaultpicture} alt='Imagen' className='img-fluid product-details__image' />
      </div>      
        <div className='botones-container'>
        <button className='boton-izquierdo'>Agregar al carrito</button>
        <button className='boton-izquierdo'>Ver prestamo</button>
      </div>
      <div className='contenido-card'>
        <p>Status: {status}</p>
        <p>Cliente: {cliente}</p>
        <p>Monto: {monto}</p>
        <p>Fecha: {fecha}</p>
      </div>
    </div>
  );
};

export default PrestamosCard;



