
import React, { useState, useEffect } from 'react';

import useAxios from '../../utils/useAxios';
const MostRequestedElements = () => {
    const api = useAxios()
    const [elements, setElements] = useState([]);
  
    useEffect(() => {
      api.get('/estadisticas/maspedido/').then((response) => {
        setElements(response.data);
      });
    }, []);
  
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Elementos más solicitados</h2>
        <ul className="list-group">
          {elements.map((element) => (
            <li
              key={element.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {element.name}
              <span className="badge badge-primary badge-pill">
                Cantidad Prestada: {element.num_borrowed_logs}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default MostRequestedElements