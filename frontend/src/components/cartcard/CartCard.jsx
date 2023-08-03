import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  } from "mdb-react-ui-kit";
import React from 'react'

export default function CartCard(props) {
  return (<MDBCard className="rounded-3 mb-4">
  <MDBCardBody className="p-4">
    <MDBRow className="justify-content-between align-items-center">
      <MDBCol md="2" lg="2" xl="2">
        <MDBCardImage className="rounded-3" fluid
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0T_zFrqWlLoJUpQnghlwjpAsw5PzmPsNSPybjLA_QUA1F83IUz9IN9KRR8dJ-efkXG-k&usqp=CAU"
          alt="Cotton T-shirt" />
      </MDBCol>
      <MDBCol md="3" lg="3" xl="3">
        <p className="lead fw-normal mb-2">Basic T-shirt</p>
        <p>
          <span className="text-muted">Size: </span>M{" "}
          <span className="text-muted">Color: </span>Grey
        </p>
      </MDBCol>
      <MDBCol md="3" lg="3" xl="2"
        className="d-flex align-items-center justify-content-around">
        <MDBBtn color="link" className="px-2">
          <MDBIcon fas icon="minus" />
        </MDBBtn>

        <MDBInput min={0} defaultValue={2} type="number" size="sm" />

        <MDBBtn color="link" className="px-2">
          <MDBIcon fas icon="plus" />
        </MDBBtn>
      </MDBCol>
      <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
        <MDBTypography tag="h5" className="mb-0">
          $499.00
        </MDBTypography>
      </MDBCol>
      <MDBCol md="1" lg="1" xl="1" className="text-end">
        <a href="#!" className="text-danger">
          <MDBIcon fas icon="trash text-danger" size="lg" />
        </a>
      </MDBCol>
    </MDBRow>
  </MDBCardBody>
</MDBCard>
  )
}
