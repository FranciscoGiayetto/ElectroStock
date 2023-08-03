// Prestamos.jsx

import React, { useState, useEffect } from 'react';
import useAxios from '../../utils/useAxios';
import PrestamosCard from './CardPrestamos'; // Importar el componente PrestamosCard

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  let api = useAxios();

  useEffect(() => {
    getPrestamos();
  }, []);

  const getPrestamos = async () => {
    try {
      const response = await api.get('/prestamos/');
      let data = await response.data;
      console.log(data)
      setPrestamos(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container pagecontainer'>
      <h1>Mis prestamos</h1>

      {prestamos.length > 0 ? (
        prestamos.map((prestamo) => (
          
          <PrestamosCard  
          
            status={prestamo.status}
            cliente={prestamo.borrower.username}
            monto={prestamo.monto}
            fecha={prestamo.fecha}
          />
        ))
      ) : (
        <p>Cargando préstamos...</p>
      )}
    </div>
  );
};

export default Prestamos;
