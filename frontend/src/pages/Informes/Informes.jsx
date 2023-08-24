import React, { useState, useEffect } from 'react';

import MostRequestedElements from './MostRequestedElements';
import './Informes.css';

function Informes() {
  return (
    <div className='container pagecontainer'> 
      {/* Renderiza el componente MostRequestedElements aquí */}
      <MostRequestedElements />
    </div>
  );
}

export default Informes;
