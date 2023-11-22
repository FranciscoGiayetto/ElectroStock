import React, { useState, useEffect } from 'react';
import './Informes.css';
import MostRequestedElements from './MostRequestedElements';
import TasaVencidos from './TasaVencidos';
import TasaAprobacion from './TasaAprobacion';
import DiaDemandado from './DiaDemandado';
import TiempoPorPrestamo from './TiempoPorPrestamo';
import HorizontalBarChart from './HorizontalBarChart';
import VerticalBarChart from './VerticalBarChart';

function Informes({ isProfessor }) {
  const [deudorData, setDeudorData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  console.log(isProfessor);
  useEffect(() => {
    fetch('/api/estadisticas/mayordeudor/')
      .then(response => response.json())
      .then(data => setDeudorData(data))
      .catch(error => console.error('Error fetching deudor data:', error));

    fetch('/api/estadisticas/box_mas_logs_rotos/')
      .then(response => response.json())
      .then(data => setBoxData(data))
      .catch(error => console.error('Error fetching box data:', error));
  }, []);

  // Verificar si la pantalla es de un tamaño pequeño (por ejemplo, un dispositivo móvil)
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    return (
      <div className="container pagecontainer" style={{ marginLeft: '10px', overflowY: 'hidden' }}>
        {/* Contenido para dispositivos móviles */}
        <div className="row">
          <div className="col-12">
            <TasaVencidos endpoint="estadisticas/vencidos/" />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <TasaAprobacion endpoint="estadisticas/aprobado/" />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column align-items-start" style={{ marginLeft: '11px' }}>
              <TiempoPorPrestamo />
              <DiaDemandado subtitle="Día que más se pide" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h4>Box que mas se rompen</h4>
            <VerticalBarChart data={boxData} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <MostRequestedElements endpoint="estadisticas/maspedido/" />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h4 style={{ marginTop: '30px' }}>Top deudores</h4>
            <HorizontalBarChart data={deudorData}></HorizontalBarChart>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container pagecontainer" style={{marginLeft:'125px', overflowY:'hidden'}}>
      <div className="row">
        {/* Fila 1 */}
        <div className="col-md-4">
          <TasaVencidos endpoint="estadisticas/vencidos/" />
        </div>
        <div className="col-md-4">
          <TasaAprobacion endpoint="estadisticas/aprobado/" />
        </div>
        
        <div className="col-md-4">
  <div className="d-flex flex-column align-items-start" style={{ marginLeft: '11px' }}>
    <TiempoPorPrestamo />
    <DiaDemandado subtitle="Día que más se pide" />
  </div>
</div>

      </div>

      <div className="row" style={{ marginTop: '30px' }}>
        {/* Fila 2 */}
        <div className="col-md-8">
          <h4>Box que mas se rompen</h4>
          <VerticalBarChart data={boxData} />
        </div>
        <div className="col-md-4">
          <MostRequestedElements endpoint="estadisticas/maspedido/" />
        </div>
      </div>

      <div className="col-md-8 d-flex flex-column align-items-start">
  <h4 style={{marginTop:'30px'}}>Top deudores</h4>
  <HorizontalBarChart data={deudorData}></HorizontalBarChart>
</div>
      
    </div>
    
  );
}

export default Informes;
