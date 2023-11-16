import React, { useEffect, useState } from 'react';
import CardMyData from '../../components/CardMyData/CardData.jsx';
import CardUser from '../../components/CardUser/CardUser.jsx';
import './Presupuestos.css'
import useAxios from '../../utils/useAxios.js';
import { useAuthStore } from '../../store/auth.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from "./DataTable.jsx";
import Spinner from 'react-bootstrap/Spinner';


function Presupuestos() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  const [element, setElement] = useState([]);
  const [presupuestos, setPresupuestos] = useState([]);
  const api = useAxios();
  const userData = user();
  const [loading, setLoading] = useState(true); // Nuevo estado para el Spinner


 

  const getPresupuesto = async () => {
    try {
      setLoading(true); // Inicia el Spinner

      const response = await api.get(`/budget/`);
      let data = await response.data;
      console.log(data)
      setPresupuestos(data);
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false); // Detiene el Spinner después de la carga
    }
  };

  useEffect(() => {
    getPresupuesto();
  }, []);

  
  return (
    <div>
          {loading && (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Spinner animation="border" role="status">
               
              </Spinner>
            </div>
          )}
    <Container fluid style={{ marginTop: '6rem', marginBottom: '5rem' }}>
      
      <Row>
        <Col style={{ width: '62.5rem' }}>
          <DataTable presupuestos={presupuestos} />
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Presupuestos;
