import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import useAxios from '../../utils/useAxios';

const DiaDemandado = ({ subtitle }) => {
  const [dateInData, setDateInData] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get('/estadisticas/date/')
      .then(response => {
        if (response.data.length > 0) {
          const { dateIn } = response.data[0];

          // Formatear la fecha en el formato "DD/MM"
          const formattedDate = new Date(dateIn).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
          });

          setDateInData(formattedDate);
        }
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
            <PollOutlinedIcon sx={{ fontSize: 50 }} style={{ alignSelf: 'center' }} />
          </div>
          <div>
            <h5 style={{ margin: '0' }}>{dateInData}</h5>
            <p style={{ margin: '0', fontSize: '0.8rem' }}>{subtitle}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DiaDemandado;
