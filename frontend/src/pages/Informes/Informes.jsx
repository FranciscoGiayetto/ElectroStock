import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { getRefreshToken } from '../../utils/auth';
import useAxios from '../../utils/useAxios';
import "./Informes.css";
import axios from "axios";

const MostRequestedElements = () => {
    const [elements, setElements] = useState([]);
  
    useEffect(() => {
      axios.get("/api/most_requested_elements/").then((response) => {
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
  
  export default MostRequestedElements;