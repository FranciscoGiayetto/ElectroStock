import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import useAxios from '../../utils/useAxios';
import './Prestamos.css';
import { useAuthStore } from '../../store/auth';
import { Form, Button, Accordion, Card } from 'react-bootstrap';

const Prestamos = () => {
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
            <div className="filter-section">
            <Form >
      <Form.Group controlId="searchText">
        <Form.Control
          type="text"
          placeholder="Buscar..."
        />
      </Form.Group>
      <select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
          
      <Button variant="primary" type="submit">
        Buscar
      </Button>
    </Form>
  
 
</div>

      <div className='prestamos-list'>
        

        {prestamos.length > 0 ? (
          prestamos.map((prestamo, index) => (
            
            <PrestamosCard
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

export default Prestamos;
