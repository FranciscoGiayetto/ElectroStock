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
          setDateInData(dateIn);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, [axiosInstance]);

  return (
    <Card style={{ borderRadius: '15px' }}>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="mr-3">
            <PollOutlinedIcon fontSize="large" />
          </div>
          <div>
          <h5 style={{ marginBottom: '1px' }}>{dateInData}</h5>
            <p style={{ marginTop: '1px' }} className="mb-0">{subtitle}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DiaDemandado;

