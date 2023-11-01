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
      <Row>
      <h1 style={{paddingRight:'10rem'}}>Hola {userData.username}!</h1>

        <Col xs={6} style={{  marginRight: '5rem' }}>
          <Row >
            <Col xs={6} style={{ marginTop: '1rem' }}>
              <CardVencidos />
            </Col>
            <Col xs={6} style={{ paddingLeft:'5rem', marginTop: '1rem' }}>
              <CardPendientes />
            </Col>
          </Row>
          <Row>
            <Col xs={6} style={{ marginTop: '2rem' }}>
              <div className="card shadow-all-over">
                <CardPrestamos />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={5} style={{ paddingLeft: '7rem' }} >
          <div className="card shadow-all-over">
            <CardNotificaciones />
          </div>
        </Col>
      </Row>
      
    </Container>
  );
}

export default HomePage;
