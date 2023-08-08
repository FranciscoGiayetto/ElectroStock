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
  return (
    <MDBCard className="rounded-3 mb-4">
      <MDBCardBody className="p-4">
        <MDBRow className="align-items-center">
          <MDBCol md="2" lg="2" xl="2">
            <MDBCardImage
              className="rounded-3"
              fluid
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0T_zFrqWlLoJUpQnghlwjpAsw5PzmPsNSPybjLA_QUA1F83IUz9IN9KRR8dJ-efkXG-k&usqp=CAU"
              alt="Cotton T-shirt"
            />
          </MDBCol>
          <MDBCol md="3" lg="3" xl="3">
            <p className="lead fw-normal mb-2">Basic T-shirt</p>
            <p>
              <span className="text-muted">Size: </span>M{" "}
              <span className="text-muted">Color: </span>Grey
            </p>
          </MDBCol>
          <MDBCol
            md="3"
            lg="3"
            xl="2"
            className="d-flex align-items-center justify-content-around"
          >
            <MDBInput min={0} defaultValue={2} type="number" size="sm" />
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
