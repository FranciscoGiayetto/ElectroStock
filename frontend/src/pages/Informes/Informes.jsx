import React, { useState, useEffect } from 'react';

import MostRequestedElements from './MostRequestedElements';
import './Informes.css';
import Tasas from './Tasas';

function Informes() {
  return (
    <div className='container pagecontainer'> 
      <MostRequestedElements endpoint="estadisticas/maspedido/"/>
      <MostRequestedElements endpoint="estadisticas/elementsCero/"/>
      <Tasas endpoint="estadisticas/vencidos/"/>
    </div>
  );
}

export default Informes;
