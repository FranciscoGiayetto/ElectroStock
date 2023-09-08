import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import officeImage from './office.jpg';
import './HomePage.css';
import CardPrestamos from './CardPrestamos';
import CardVencidos from './CardVencidos';
import CardPendientes from './CardPendientes';
import { useAuthStore } from '../../store/auth';
import { getCurrentToken } from '../../utils/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardNotificaciones from './CardNotificaciones';

function HomePage() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  const token = getCurrentToken();
  const userData = user();
  console.log(token.PromiseResult);

  return (
    <Container className='pagecontainer container'>
        <h1 style={{paddingRight:'10rem'}}>Bienvenido {userData.username}</h1>
      <Row>
        <Col xs={6} style={{  marginRight: '5rem' }}>
          <Row >
            <Col xs={6} style={{ marginTop: '5rem' }}>
              <CardVencidos />
            </Col>
            <Col xs={6} style={{ paddingLeft:'5rem', marginTop: '5rem' }}>
              <CardPendientes />
            </Col>
          </Row>
          <Row>
            <Col xs={6} style={{ marginTop: '2rem' }}>
              <CardPrestamos />
            </Col>
          </Row>
        </Col>
        <Col xs={5  } style={{ paddingLeft: '7rem' }}>
          <CardNotificaciones />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
