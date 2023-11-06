import React, { useState, useEffect } from 'react';
import PrestamosCardProfes from './CardPrestamosProfesor';
import useAxios from '../../utils/useAxios';
import './Prestamos.css';
import { useAuthStore } from '../../store/auth';

const PrestamoProfesor = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const api = useAxios();
  const [prestamos, setPrestamos] = useState([]);
  const user_id = userData.user_id;

  useEffect(() => {
    
    
    getPrestamos();


  }, []   );
  const getPrestamos = async () => {
    try {
      const response = await api.get(`/prestamosHistorial/${user_id}/`);
      console.log(response.data); // Verifica la respuesta de la API
      const data = response.data;
      setPrestamos(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (<div className='container pagecontainer'>
            <h1 className='textito'>Mis prestamos</h1>

      <div className='prestamos-list'>
        

        {prestamos.length > 0 ? (
          prestamos.map((prestamo, index) => (
            
            <PrestamosCardProfes
              key={index}
              image={prestamo.box.element.image}
              status={prestamo.status}
              cliente={prestamo.borrower.username}
              dateIn={prestamo.dateIn}
              componente={prestamo.box.element.name}

            />
          ))
        ) : (
          
          <p>Cargando préstamos...</p>
        )}
      </div>
    </div>
  );
};


export default PrestamoProfesor;