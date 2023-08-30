import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import officeImage from './office.jpg';
import './HomePage.css'
import CardPrestamos from './CardPrestamos';
import CardVencidos from './CardVencidos';
import CardPendientes from './CardPendientes';
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


  const token = getCurrentToken()
  const userData = user()
  console.log(token.PromiseResult)



  
  return (
    <Container>      
        <Row>
          <Col xs={7}>
                  <Container fluid className='container1'>
                  <Row>
                  <Col><CardVencidos /></Col>
                  <Col><CardPendientes /></Col>
                </Row>
                <Row>
                  <Col><CardPrestamos /></Col>
                  
                </Row>
                </Container>
          </Col>

          <Col xs={5} className='container1'>
                <CardPrestamos/>
          </Col>
        </Row>
    </Container>
       
    
  );
}

export default HomePage;
