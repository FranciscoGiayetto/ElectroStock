import React, {useEffect, useState} from 'react';

import CardMyData from '../../components/CardMyData/CardData.jsx';
import CardUser from '../../components/CardUser/CardUser.jsx';
import CardPrestamos from '../../components/CardPrestamos/CardPrestamos.jsx';
import './DetalleCuenta.css'
import useAxios from '../../utils/useAxios';
import { useAuthStore } from '../../store/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';




function DetalleCuenta() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
]);
  const [element, setElement] = useState([]);
  const api = useAxios();
  const id = 3;
  const userData = user();
  console.log(userData)

  const getElement = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`);
      console.log(response);
      let data = await response.data;
      setElement(data);
      console.log(element);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getElement()
    }
    ,[]
  ) ;

  return (
    <Container fluid style={{marginTop:'6rem', marginBottom:'5rem'}}>
      <Row>
        <Col>
          <CardUser name={element.username} course={element.course}></CardUser>
        </Col>
      </Row>
      <Row style={{marginTop:'2rem'}}>
        <Col>
          <CardMyData email={element.email}></CardMyData>
        </Col>
      </Row>
      <Row style={{marginTop:'2rem'}}>
        <Col>
        <CardPrestamos></CardPrestamos>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleCuenta;
