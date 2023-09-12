import React, { useState, useEffect } from 'react';
import './Informes.css';
import MostRequestedElements from './MostRequestedElements';
import TasaVencidos from './TasaVencidos';
import TasaAprobacion from './TasaAprobacion';
import BoxMasLogRotos from './BoxMasLogRotos';

function Informes() {
  return (
    <div className='container pagecontainer'> 
      <MostRequestedElements endpoint="estadisticas/maspedido/"/>
      <TasaVencidos endpoint="estadisticas/vencidos/"/>
      <TasaAprobacion endpoint="estadisticas/aprobado/"/>
      <BoxMasLogRotos endpoint="estadisticas/box_mas_logs_rotos/"/>
    </div>
  );
}

export default Informes;
