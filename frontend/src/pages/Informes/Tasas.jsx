import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import useAxios from '../../utils/useAxios';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const Tasas = ({ endpoint }) => {
    const api = useAxios();
    const [stadisticsData, setStadisticsData] = useState(null);
    const vencido_percentage = 0;
    useEffect(() => {
        api.get(endpoint).then((response) => {
            console.log(response)
            console.log(response.vencido_percentage)
          setStadisticsData(response.stadisticsData);
          vencido_percentage = stadisticsData.vencido_percentage;
          
        });
      }, []);

    return (
        <div className="container mt-4">
          <ListGroup as="ul" className='wide'>
            <ListGroup.Item as="li" className='num font-bold'>
              <span className='icono-tasa'><EventBusyIcon></EventBusyIcon></span>
              {vencido_percentage !== null ? {vencido_percentage} : 'Cargando...'}
            </ListGroup.Item>
            <ListGroup.Item as="li" active>
                Tasa vencidos
            </ListGroup.Item>

          </ListGroup>
        </div>
    );
}

export default Tasas;
