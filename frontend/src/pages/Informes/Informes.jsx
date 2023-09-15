import React, { useState, useEffect } from 'react';
import './Informes.css';
import MostRequestedElements from './MostRequestedElements';
import TasaVencidos from './TasaVencidos';
import TasaAprobacion from './TasaAprobacion';
import DiaDemandado from './DiaDemandado';
import TiempoPorPrestamo from './TiempoPorPrestamo';
import HorizontalBarChart from './HorizontalBarChart'; // Importa el componente HorizontalBarChart

function Informes() {
  const [deudorData, setDeudorData] = useState([]); // Estado para almacenar los datos del endpoint

  useEffect(() => {
    // Realiza una llamada a tu endpoint /api/estadisticas/mayordeudor/
    // y actualiza el estado de deudorData con los datos recibidos
    fetch('/api/estadisticas/mayordeudor/')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Verifica los datos aquí
        setDeudorData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
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
    </div>
  );
}

export default Informes;

