import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { Dropdown } from 'react-bootstrap';

const OrdenarPorPrestamos = () => {
  const api = useAxios();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Lógica para obtener opciones (si es necesario)
  }, []);

  return (
    <div className="word-list">
      <Dropdown>
        <Dropdown.Toggle
          variant="black"
          id="dropdown-filtros"
          style={{ backgroundColor: 'white', color: 'black' }}
        >
          Ordenar por
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Fecha</Dropdown.Item>
          <Dropdown.Item>Componentes</Dropdown.Item>
          <Dropdown>
            <Dropdown.Toggle
              variant="black"
              id="dropdown-estado"
              style={{ backgroundColor: 'white', color: 'black' }}
            >
              Estado
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Aprobado</Dropdown.Item>
              <Dropdown.Item>Pendiente</Dropdown.Item>
              <Dropdown.Item>Rechazado</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default OrdenarPorPrestamos;
