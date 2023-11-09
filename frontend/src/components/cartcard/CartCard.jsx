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
            {/* ... (other code) */}
          </MDBCol>
          <MDBCol md="3" lg="3" xl="6">
            <p className="lead fw-normal mb-2">{title}</p>
            <MDBInput
              // Establece el valor del campo de entrada con la observación existente.
              value={observation}
              onChange={handleObservationChange}
              className='input-style'
            />
          </MDBCol>
          <MDBCol md="3" lg="3" xl="2"
            className="d-flex align-items-center justify-content-around"
          >
            <MDBInput
              min={0}
              value={quantity}
              onChange={handleInputChange}
              type="number"
              size="sm"
              className='quantity-style'
            />
          </MDBCol>
          <MDBCol md="1" lg="1" xl="2" className="d-flex align-items-center justify-content-end">
            <Button onClick={() => handleDelete(id)} style={{ background: 'none', border: 'none' }}>
              <ClearRoundedIcon style={{ color: '#2E5266' }} />
            </Button>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
