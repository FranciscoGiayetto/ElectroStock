import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import CardPrestamos from './CardPrestamos';
import CardVencidos from './CardVencidos';
import CardPendientes from './CardPendientes';
import CardNotificaciones from './CardNotificaciones';
import { useAuthStore } from '../../store/auth';
import { getCurrentToken } from '../../utils/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function HomePage() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  const token = getCurrentToken();
  const userData = user();
  console.log(token.PromiseResult);

  return (
    <Container className='pagecontainer'>
      <Row>
        <Col md={9}>

          <Row >
            <Col> <CardVencidos/> </Col>
            <Col> <CardPendientes/> </Col>
          </Row>

          <Row >
            <Col> <CardPrestamos/> </Col>
          </Row>

        </Col>

        <Col md={3} className="d-none d-md-block"> <CardNotificaciones/> </Col> 
      </Row>

    </Container>
  );
}

export default HomePage;
