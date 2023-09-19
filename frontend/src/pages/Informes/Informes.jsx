import React, { useState, useEffect } from 'react';
import './Informes.css';
import MostRequestedElements from './MostRequestedElements';
import TasaVencidos from './TasaVencidos';
import TasaAprobacion from './TasaAprobacion';
import DiaDemandado from './DiaDemandado';
import TiempoPorPrestamo from './TiempoPorPrestamo';
import HorizontalBarChart from './HorizontalBarChart';
import VerticalBarChart from './VerticalBarChart'; // Importa el nuevo componente VerticalBarChart

function Informes() {
  const [deudorData, setDeudorData] = useState([]);
  const [boxData, setBoxData] = useState([]); // Nuevo estado para los datos del endpoint box_mas_logs_rotos

  useEffect(() => {
    // Realiza una llamada a tu endpoint /api/estadisticas/mayordeudor/
    // y actualiza el estado de deudorData con los datos recibidos
    fetch('/api/estadisticas/mayordeudor/')
      .then(response => response.json())
      .then(data => setDeudorData(data))
      .catch(error => console.error('Error fetching deudor data:', error));

    // Realiza una llamada a tu nuevo endpoint /api/estadisticas/box_mas_logs_rotos/
    // y actualiza el estado de boxData con los datos recibidos
    fetch('/api/estadisticas/box_mas_logs_rotos/')
      .then(response => response.json())
      .then(data => setBoxData([data])) // Convertimos el objeto en un array para que sea coherente con el formato de datos de gráficos
      .catch(error => console.error('Error fetching box data:', error));
  }, []);

  return (
    <div className='container pagecontainer'>
      <MostRequestedElements endpoint="estadisticas/maspedido/" />
      <TasaVencidos endpoint="estadisticas/vencidos/" />
      <TasaAprobacion endpoint="estadisticas/aprobado/" />
      <TiempoPorPrestamo />
      <DiaDemandado subtitle="Día que más se pide" />

      {/* Renderiza el gráfico de barras horizontal con los datos de deudorData */}
      <div className="deudor-chart">
        <h2>Top deudores</h2>
        <HorizontalBarChart data={deudorData} />
      </div>

      {/* Renderiza el gráfico de barras verticales con los datos de boxData */}
      <div className="box-chart">
        <h2>Productos que mas se rompen</h2>
        <VerticalBarChart data={boxData} />
      </div>
    </div>
  );
}

export default Informes;
