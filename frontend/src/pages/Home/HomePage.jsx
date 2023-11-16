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
import Carousel from 'react-bootstrap/Carousel';
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
    <Container className='pagecontainer d-flex align-items-center justify-content-center' style={{ paddingBottom: '12rem' }}>
      <Row>
        <Col md={6}>
          <h1>Bienvenido {userData.username}!</h1>
          <ClockPage />
        </Col>
        <Col md={6}>
          <div className="carousel-container">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.itsv.edu.ar/itsv/images/panoramicas/c_electricidad.jpg?1699747203772"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.itsv.edu.ar/itsv/images/panoramicas/a_frente.jpg?1699747200027"
                  alt="Second slide"
                />
              </Carousel.Item>
              {/* Add more Carousel.Item for additional images */}
            </Carousel>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
