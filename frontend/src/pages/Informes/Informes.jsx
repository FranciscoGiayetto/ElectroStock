import React from 'react';
import './Informes.css';
import MostRequestedElements from './MostRequestedElements';
import TasaVencidos from './TasaVencidos';
import TasaAprobacion from './TasaAprobacion';
import DiaDemandado from './DiaDemandado';
import TiempoPorPrestamo from './TiempoPorPrestamo'

function Informes() {
  return (
    <div className='container pagecontainer'> 
      <MostRequestedElements endpoint="estadisticas/maspedido/" />
      <TasaVencidos endpoint="estadisticas/vencidos/" />
      <TasaAprobacion endpoint="estadisticas/aprobado/" />
      <TiempoPorPrestamo/>
      <DiaDemandado subtitle="Día que más se pide" />
    </div>
  );
}

export default Informes;
