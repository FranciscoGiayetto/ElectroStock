// PrestamosCard.js

import React from 'react';
import './PrestamosCard.css'; 
import { Link } from 'react-router-dom';
// PrestamosCard.js
const PrestamosCard = (props) => {
  return (
    <div className='card'>
     
      <h3>status: {props.status}</h3>
      <p>Cliente: {props.cliente}</p>
      <p>Monto: {props.monto}</p>
      <p>Fecha: {props.fecha}</p>
      {/* Agregar más propiedades de acuerdo a la clase Prestamos */}
    </div>
  );
};

export default PrestamosCard;


