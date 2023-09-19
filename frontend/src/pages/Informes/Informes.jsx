import React, { useState, useEffect } from 'react';
import './Informes.css';
import MostRequestedElements from './MostRequestedElements';
import TasaVencidos from './TasaVencidos';
import TasaAprobacion from './TasaAprobacion';
import DiaDemandado from './DiaDemandado';
import TiempoPorPrestamo from './TiempoPorPrestamo';
import HorizontalBarChart from './HorizontalBarChart';
import VerticalBarChart from './VerticalBarChart';

function Informes() {
  const [deudorData, setDeudorData] = useState([]);
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    fetch('/api/estadisticas/mayordeudor/')
      .then(response => response.json())
      .then(data => setDeudorData(data))
      .catch(error => console.error('Error fetching deudor data:', error));

    fetch('/api/estadisticas/box_mas_logs_rotos/')
      .then(response => response.json())
      .then(data => setBoxData([data]))
      .catch(error => console.error('Error fetching box data:', error));
  }, []);

  return (
    <div className="container pagecontainer">
      <div className="row">
        {/* Fila 1 */}
        <div className="col-md-4">
          <TasaVencidos endpoint="estadisticas/vencidos/" />
        </div>
        <div className="col-md-4">
          <TasaAprobacion endpoint="estadisticas/aprobado/" />
        </div>
        <div className="col-md-4">
          <div className="d-flex flex-column">
            <TiempoPorPrestamo />
            <DiaDemandado subtitle="Día que más se pide" />
          </div>
        </div>
      </div>

      <div className="row">
        {/* Fila 2 */}
        <div className="col-md-4">
          <MostRequestedElements endpoint="estadisticas/maspedido/" />
        </div>
        <div className="col-md-8">
          <HorizontalBarChart data={deudorData} />
        </div>
      </div>

      <div className="row">
        {/* Fila 3 */}
        <div className="col-md-6">
          <VerticalBarChart data={boxData} />
        </div>
      </div>
    </div>
  );
}

export default Informes;
