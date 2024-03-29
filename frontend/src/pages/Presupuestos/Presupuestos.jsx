import React, { useEffect, useState } from 'react';
import CardMyData from '../../components/CardMyData/CardData.jsx';
import CardUser from '../../components/CardUser/CardUser.jsx';
import './Presupuestos.css'
import useAxios from '../../utils/useAxios.js';
import { useAuthStore } from '../../store/auth.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from "./DataTable.jsx"

function Presupuestos() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  const [element, setElement] = useState([]);
  const [presupuestos, setPresupuestos] = useState([]);
  const api = useAxios();
  const userData = user();
  const id = userData.user_id;

 

  const getPresupuesto = async () => {
    try {
      const response = await api.get(`/budget/`);
      let data = await response.data;
      console.log(data)
      setPresupuestos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPresupuesto();
  }, []);

  
  return (
    <Container fluid style={{ marginTop: '6rem', marginBottom: '5rem' }}>
      
      <Row>
        <Col style={{ width: '62.5rem' }}>
          <DataTable presupuestos={presupuestos} />
        </Col>
      </Row>
    </Container>
  );
}

export default Presupuestos;
