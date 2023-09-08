import React, { useState, useEffect } from 'react';
import './Informes.css';
import MostRequestedElements from './MostRequestedElements';
import TasaVencidos from './TasaVencidos';

function Informes() {
  return (
    <div className='container pagecontainer'> 
      <MostRequestedElements endpoint="estadisticas/maspedido/"/>
      <TasaVencidos endpoint="estadisticas/vencidos/"/>
    </div>
  );
}

export default Informes;
