// CardPrestamos.jsx

import React from 'react';
import './PrestamosCard.css'; // Importa tu archivo CSS
import defaultpicture from '../../assets/images/defaultpicture.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

const PrestamosCard = ({ status, cliente,fecha }) => {
  return (
    <div className='prestamo-card'>
        <div className='img-container'>

    <MDBCard style={{ maxWidth: '540px' }}>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage src='https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp' alt='...' fluid />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle><p>Fecha: {fecha}</p></MDBCardTitle>
            <MDBCardText>
            <p>Status: {status}</p>
            <p>Cliente: {cliente}</p>

            </MDBCardText>
            <Button variant="primary">Agregar al carrito</Button>

          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
      
      </div>
      
    </div>
  );
};

export default PrestamosCard;



