import React, { useState, useEffect } from 'react';
import './Informes.css';
import MostRequestedElements from './MostRequestedElements';
import TasaVencidos from './TasaVencidos';
import TasaAprobacion from './TasaAprobacion';
import DiaDemandado from './DiaDemandado';

function Informes() {
  return (
    <div className='container pagecontainer'> 
      <MostRequestedElements endpoint="estadisticas/maspedido/"/>
      <TasaVencidos endpoint="estadisticas/vencidos/"/>
      <TasaAprobacion endpoint="estadisticas/aprobado/"/>
      <DiaDemandado
        iconClass="fa-user"
        title="Título Grande"
        subtitle="Subtítulo más pequeño"
      />
    </div>
  );
}

export default Informes;
