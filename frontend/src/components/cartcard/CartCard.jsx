import React, { useState } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import './CartCard.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';

export default function CartCard(props) {
  const {
    id,
    name,
    title,
    image,
    quantity,
    handleDelete,
    handleQuantityChange,
    handleCommentChange,
    comments,
    currentStock,
  } = props;

  // Inicializa el estado local 'observation' con la observación existente de las props.
  const [observation, setObservation] = useState(comments);

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    console.log(`New quantity for item ${id}: ${newQuantity}`);
    handleQuantityChange(id, newQuantity);
  };

  const handleObservationChange = (e) => {
    const newObservation = e.target.value;
    console.log(`New comment for item ${id}: ${newObservation}`);
    handleCommentChange(id, newObservation);
    // Actualiza el estado local 'observation' con la nueva observación.
    setObservation(newObservation);
  };

  return (
    <MDBCard className="rounded-3 mb-4">
      <MDBCardBody className="p-4">
        <MDBRow className="align-items-center">
          <MDBCol md="2" lg="2" xl="2">
            <MDBCardImage
              className="rounded-3"
              fluid
              src={image}
            />
          </MDBCol>
          <MDBCol md="6" lg="6" xl="6" className='justify-content-start'>
            <p className="lead fw-normal mb-2">{name}</p>
            <MDBInput
              // Establece el valor del campo de entrada con la observación existente.
              value={observation}
              onChange={handleObservationChange}
              className='input-style w-75' // Removed mt-2 (margin-top) and ms-2 (margin-start) classes
            />
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2"
            className="d-flex align-items-center justify-content-start"
          >
            <MDBInput
              min={0}
              max={currentStock}
              value={quantity}
              onChange={handleInputChange}
              type="number"
              size="sm"
              className='quantity-style'
            />
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className="d-flex align-items-center justify-content-end">
            <Button onClick={() => handleDelete(id)} style={{ background: 'none', border: 'none' }}>
              <ClearRoundedIcon style={{ color: '#2E5266' }} />
            </Button>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
