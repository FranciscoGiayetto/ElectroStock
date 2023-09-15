import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import useAxios from '../../utils/useAxios';

const TiempoPorPrestamo = () => {
  const [averageDuration, setAverageDuration] = useState('');
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get('/estadisticas/avgDate/')
      .then(response => {
        const { average_duration } = response.data;
        setAverageDuration(average_duration);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, [axiosInstance]);

  return (
    <Card style={{ borderRadius: '6px', width: '370px'}}>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="mr-3">
            <AccessTimeOutlinedIcon sx={{ fontSize: 50 }} style={{ alignSelf: 'center' }} />
          </div>
          <div>
            <h5 style={{ margin: '0' }}>{averageDuration}</h5>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>Tiempo por préstamo</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TiempoPorPrestamo;
