import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import useAxios from '../../utils/useAxios';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const TasaAprobacion = ({ endpoint }) => {
    const api = useAxios();
    const [vencidoPercentage, setVencidoPercentage] = useState(null);

    useEffect(() => {
        api.get(endpoint).then((response) => {
            setVencidoPercentage(response.data[0].vencido_percentage);
        });
    }, []);

    return (
        <div className="container mt-4">
            <ListGroup as="ul" className='wide'>
                <ListGroup.Item as="li" className='num font-bold'>
                    <span className='icono-tasa'><EventBusyIcon></EventBusyIcon></span>
                    {vencidoPercentage !== null ? vencidoPercentage : 'Cargando...'}
                </ListGroup.Item>
                <ListGroup.Item as="li" active>
                    Tasa aprobación
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default TasaAprobacion;

