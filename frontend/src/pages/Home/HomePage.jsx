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
import Carousel from 'react-bootstrap/Carousel';

function HomePage() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  const token = getCurrentToken();
  const userData = user();
  console.log(token.PromiseResult);

  return (
    <Container className='pagecontainer d-flex align-items-center justify-content-center' style={{ "paddingBottom": '12rem' }}>
      <Row>
        <Col md={4}>
          <h1>Bienvenido {userData.username}!</h1>
          <ClockPage />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          {/* Add your image carousel here */}
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="your-image1.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            {/* Add more Carousel.Item for additional images */}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
