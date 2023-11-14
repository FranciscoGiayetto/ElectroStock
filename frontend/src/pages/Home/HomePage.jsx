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
import ClockPage from './ClockPage';

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

         
        <h1>Bienvenido {userData.username}!</h1>

        </Col>
      <ClockPage></ClockPage>
      </Row>

    </Container>
  );
}

export default HomePage;
