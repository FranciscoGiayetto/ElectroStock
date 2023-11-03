import React, { useEffect, useState } from 'react';
import CardMyData from '../../components/CardMyData/CardData.jsx';
import CardUser from '../../components/CardUser/CardUser.jsx';
import CardPrestamos from '../../components/CardPrestamos/CardPrestamos.jsx';
import './DetallePresupuesto.css';
import useAxios from '../../utils/useAxios.js';
import { useAuthStore } from '../../store/auth.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from "./DataTable.jsx"
import { useParams, useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link.js';
function DetallePresupuesto() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  const [elements, setElements] = useState([]);
  const [presupuesto, setPresupuesto] = useState([]);
  const api = useAxios();
  const userData = user();
  const {id} = useParams();

 



  const getElements = async () => {
  

    try {
      const response = await api.get('elementsEcommerce/');
      let data = await response.data;
      console.log(data);
     setElements(data);

    
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al obtener datos:', error);
     
    }
  };



  const getPresupuesto = async () => {
    try {
      const response = await api.get(`budgetlog/${id}/`);
      let data = await response.data;
      console.log(response)
      setPresupuesto(data);
    } catch (error) {
      console.error(error);
    }
  };



  const updateData = async () => {
    await getPresupuesto();
  };

  useEffect(() => {
    getPresupuesto();
    getElements();
  }, []);

  return (
    <Container fluid style={{ marginTop: '6rem', marginBottom: '5rem' }}>
      <Link href='/presupuesto'>Volver</Link>
      <Row>
        <Col style={{ width: '62.5rem' }}>
          <DataTable presupuesto={presupuesto} onUpdate={updateData} elements={elements}/>
        </Col>
      </Row>
    </Container>
  );
}

export default DetallePresupuesto;
