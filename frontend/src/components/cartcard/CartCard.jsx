import React from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
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
  const { id, name, title, image, quantity, handleDelete, handleQuantityChange } = props;

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    console.log(`New quantity for item ${id}: ${newQuantity}`);
    // Call the handleQuantityChange function to handle quantity changes
    handleQuantityChange(id, newQuantity);
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

          <MDBCol md="3" lg="3" xl="6">
            <p className="lead fw-normal mb-2">{title}</p>
          </MDBCol>

          <MDBCol md="3" lg="3" xl="2"
            className="d-flex align-items-center justify-content-around"
          >
            {/* Use the handleInputChange function to handle quantity changes */}
            <MDBInput
              min={0}
              value={quantity}
              onChange={handleInputChange}
              type="number"
              size="sm"
            />
          </MDBCol>

          <MDBCol md="1" lg="1" xl="2" className="d-flex align-items-center justify-content-end">
            <Button onClick={() => handleDelete(id)} style={{background:'none', border:'none'}}> <ClearRoundedIcon style={{color:'#2E5266'}}/> </Button>{' '}
          </MDBCol>

        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
