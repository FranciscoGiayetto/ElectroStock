import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';
import React from 'react';

export default function CartCard(props) {
  const { id, name, title, image, quantity } = props;
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
          <MDBCol md="3" lg="3" xl="3">
            <p className="lead fw-normal mb-2">{title}</p>
            
          </MDBCol>
          <MDBCol
            md="3"
            lg="3"
            xl="2"
            className="d-flex align-items-center justify-content-around"
          >
            <MDBInput min={0} defaultValue={quantity} type="number" size="sm" />
          </MDBCol>
          {/* Add the Bootstrap button */}
          <MDBCol md="1" lg="1" xl="5" className="d-flex align-items-center justify-content-end">
          <Button variant="danger">x</Button>{' '}
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}
