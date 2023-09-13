import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import useAxios from '../../utils/useAxios';

const BoxMasLogRotos = ({ endpoint }) => {
  const api = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(endpoint)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [api, endpoint]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-4">
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          Elementos que mas llegan a 0
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <div className="d-flex justify-content-between align-items-center subheader">
            <span>Box Nombre:</span>
            <span>{data.box_nombre}</span>
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <div className="d-flex justify-content-between align-items-center subheader">
            <span>Cantidad Logs Rotos:</span>
            <span>{data.cantidad_logs_rotos}</span>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default BoxMasLogRotos;
