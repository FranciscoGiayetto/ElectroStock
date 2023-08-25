import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import useAxios from '../../utils/useAxios';

const Tasas = ({ endpoint }) => {
    const api = useAxios();
    const [expiredRate, setExpiredRate] = useState(null);

    useEffect(() => {
        // Realiza la llamada a la API y obtén los datos
        api.get(endpoint)
            .then(response => {
                const data = response.data[0]; // Suponiendo que siempre obtienes un solo objeto en la respuesta
                const rate = data.expired_rate * 100; // Multiplica por 100 para obtener el porcentaje
                setExpiredRate(rate);
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, [api, endpoint]);

    return (
        <ListGroup as="ul">
            <ListGroup.Item as="li" className='num'>
                {expiredRate !== null ? `${expiredRate.toFixed(2)}%` : 'Cargando...'}
            </ListGroup.Item>
            <ListGroup.Item as="li" active>
                Tasa vencidos
            </ListGroup.Item>

        </ListGroup>
    );
}

export default Tasas;
