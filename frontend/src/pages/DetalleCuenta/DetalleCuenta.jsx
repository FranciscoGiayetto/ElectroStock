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
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import fotoPrueba2 from '../../assets/fotoPrueba2.jpg';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from 'react-bootstrap/Button';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';




function DetalleCuenta() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
]);
  const [element, setElement] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const api = useAxios();
  const userData = user();
  const id = userData.user_id;

  console.log(id)

  const getUser = async () => {
    try {
      const response = await api.get(`http://127.0.0.1:8000/api/users/${id}/`);
      let data = await response.data;
      console.log(data)
      setElement(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getPrestamos = async () => {
    try {
      const response = await api.get(`/prestamosHistorial/${id}/`);
      let data = await response.data;
      console.log(data)
      setPrestamos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser()
    getPrestamos()
    }
    ,[]
  ) ;


  return (
    <Container fluid style={{marginTop:'6rem', marginBottom:'5rem'}}>
      <Row>
        <Col>
          <CardUser first_name={user.first_name} last_name={user.last_name} course={user.course}></CardUser>
        </Col>
      </Row>
      <Row style={{marginTop:'2rem'}}>
        <Col>
          <CardMyData email={user.email} username={user.username}></CardMyData>
        </Col>
      </Row>
      <Row style={{marginTop:'2rem'}}>
        <Col>
        {prestamos.length > 0 ? (
          prestamos.map((prestamo, index) => (
            <CardPrestamos status={prestamos.status} 
                           quantity={prestamos.quantity} 
                           profeNombre={prestamos.borrower.first_name} 
                           profeApellido={prestamos.borrower.last_name}
                           specialties={prestamo.lender.specialties}></CardPrestamos>  
          ))
        ) : (
          
          <p>Cargando préstamos...</p>
        )}
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleCuenta;
