import React, { useState, useEffect } from 'react';

import MostRequestedElements from './MostRequestedElements';
import './Informes.css';

function Informes() {
  return (
    <div className='container pagecontainer'> 
      {/* Renderiza el componente MostRequestedElements aquí */}
      <MostRequestedElements endpoint="estadisticas/maspedido/"/>
      <MostRequestedElements endpoint="estadisticas/elementsCero/"/>
    </div>
  );
}

export default Informes;
