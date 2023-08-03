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
  return (<section>
    <MDBCard className="mb-3">
    <MDBCardBody>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div>
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
              fluid className="rounded-3" style={{ width: "65px" }}
              alt="Shopping item" />
          </div>
          <div className="ms-3">
            <MDBTypography tag="h5">
              Iphone 11 pro
            </MDBTypography>
            <p className="small mb-0">256GB, Navy Blue</p>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div style={{ width: "50px" }}>
            <MDBTypography tag="h5" className="fw-normal mb-0">
              2
            </MDBTypography>
          </div>
          <div style={{ width: "80px" }}>
            <MDBTypography tag="h5" className="mb-0">
              $900
            </MDBTypography>
          </div>
          <a href="#!" style={{ color: "#cecece" }}>
            <MDBIcon fas icon="trash-alt" />
          </a>
        </div>
      </div>
    </MDBCardBody>
  </MDBCard>
  </section>
  )
}
