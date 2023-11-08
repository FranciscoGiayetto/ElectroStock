import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import useAxios from '../../utils/useAxios';
import './Prestamos.css';
import { useAuthStore } from '../../store/auth';
import PrestamosCardPackage from './PrestamosCardPackage';
const Prestamos = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const api = useAxios();
  const [data, setData] = useState([]);

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
      // Extract the dates from the response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container pagecontainer">
      <h1 className="textito">Mis prestamos</h1>

   
      
      {data.length > 0 ? (
            data.map((prestamo, index) => (
              <PrestamosCardPackage
                key={index}
                image={prestamo.image}
                status={prestamo.estado}
                name={prestamo.nombre}
                dateIn={prestamo.dateIn}
                dateOut={prestamo.dateOut}
                count={prestamo.count}
              />
            
         
        ))): (
          <p>Cargando préstamos...</p>
          )}
      

    </div>
    );
  };
  

export default Prestamos;
