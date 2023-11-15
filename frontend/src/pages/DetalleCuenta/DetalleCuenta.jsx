import React, { useEffect, useState } from 'react';
import CardMyData from '../../components/CardMyData/CardData.jsx';
import CardUser from '../../components/CardUser/CardUser.jsx';
import './DetalleCuenta.css';
import useAxios from '../../utils/useAxios';
import { useAuthStore } from '../../store/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DetalleCuenta() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  const [element, setElement] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [specialtiesName, setSpecialtiesName] = useState('');
  const [courseName, setCourseName] = useState('');
  const api = useAxios();
  const userData = user();
  const id = userData.user_id;

  const getUser = async () => {
    try {
      const response = await api.get(`http://127.0.0.1:8000/api/users/${id}/`);
      let data = await response.data;
      console.log(data);
      setElement(data);

      // Use optional chaining to safely access nested properties
      setSpecialtiesName(data.specialties?.join(', '));

      // Use optional chaining for course as well
      setCourseName(data.course?.name);
    } catch (error) {
      console.error(error);
    }
  };

  const getPrestamos = async () => {
    try {
      const response = await api.get(`/prestamosHistorial/${id}/`);
      let data = await response.data;
      console.log(data);
      setPrestamos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getPrestamos();
  }, []);

  return (
    <Container fluid style={{ marginTop: '6rem', marginBottom: '5rem' }}>
      <Row>
        <Col>
          <CardUser
            first_name={element.first_name}
            last_name={element.last_name}
            course={element.course?.grade} 
            specialties = {specialtiesName}
          ></CardUser>
        </Col>
      </Row>
      <Row style={{ marginTop: '2rem' }}>
        <Col>
          <CardMyData
            email={element.email}
            username={element.username}
            specialties={specialtiesName}
          ></CardMyData>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleCuenta;
