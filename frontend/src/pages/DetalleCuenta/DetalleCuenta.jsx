import React from 'react';

import CardMyData from '../../components/CardMyData/CardMyData.jsx';
import CardUser from '../../components/CardUser/CardUser.jsx';
import './DetalleCuenta.css'
import { useAuthStore } from '../../store/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function DetalleCuenta() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
]);
  const userData = user()
  console.log(userData)
  return (
    <Container fluid style={{marginTop:'6.25rem'}}>
      <Row>
        <Col>
          <CardUser></CardUser>
        </Col>
      </Row>
      <Row style={{marginTop:'2rem'}}>
        <Col>
          <CardMyData></CardMyData>
        </Col>
      </Row>
       
         
    </Container>
  );
}

export default DetalleCuenta;
