// Prestamos.jsx

import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import './Prestamos.css'; 

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    // Simulación de datos de prueba
    const datosDePrueba = [
      {
        status: 'Aprobado',
        borrower: { username: 'Usuario1' },
        monto: 1000,
        fecha: '2023-08-17',
      },
      {
        status: 'Pendiente',
        borrower: { username: 'Usuario2' },
        monto: 1500,
        fecha: '2023-08-18',
      },
    ];

    setPrestamos(datosDePrueba);
  }, []);

  return (
    <div className='container pagecontainer'>
            <h1 className='titulo'>Mis préstamos</h1>
      <div className='prestamos-list'>
        {prestamos.length > 0 ? (
          prestamos.map((prestamo, index) => (
            <PrestamosCard
              key={index}
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
    </div>
  );
};

export default Prestamos;
