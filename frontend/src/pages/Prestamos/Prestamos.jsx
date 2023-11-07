import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import useAxios from '../../utils/useAxios';
import './Prestamos.css';
import { useAuthStore } from '../../store/auth';

const Prestamos = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const api = useAxios();
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const user_id = userData.user_id;
  
  useEffect(() => {
    getPrestamos();
  }, []);

  const getPrestamos = async () => {
    try {
      const response = await api.get(`/prestamosHistorial/${user_id}`);
      console.log(response.data); // Verify the response from the API
      const data = response.data;
      setData(data);
      setDates(Object.keys(data)); // Extract the dates from the response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container pagecontainer">
      <h1 className="textito">Mis prestamos</h1>

      {dates.length > 0 ? (
        dates.map((date) => (
          <div key={date} className="prestamos-list">
            <h2>{date}</h2>
            {data[date].map((prestamo, index) => (
              <PrestamosCard
                key={index}
                image={prestamo.box.element.image}
                status={prestamo.status}
                cliente={prestamo.borrower.username}
                clienteId={prestamo.borrower.user_id}
                dateIn={prestamo.dateIn}
                componente={prestamo.box.element.name}
              />
            ))}
          </div>
        ))
      ) : (
        <p>Cargando préstamos...</p>
      )}
    </div>
  );
};

export default Prestamos;
