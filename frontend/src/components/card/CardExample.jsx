import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './CardExample.css';
import { Link } from 'react-router-dom';
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function CardExample(props) {
  const { id, name, title, image, text } = props;
  return (
    <MDBContainer fluid >
      <MDBRow className="justify-content-end mb-3">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                  >
                    <Link to={`/detalleProducto/${id}`}>

                    <MDBCardImage
                      src={image}
                      fluid
                      className="w-100"
                    />
                    </Link>
                    <a>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                          
                    </a>
                  </MDBRipple>
                </MDBCol>
                
                <MDBCol 
                  
                  className="border-sm-start-none border-start"
                >
                  <div className="d-flex flex-row align-items-center mb-1">
                 

                    <h4 className="mb-1 me-1"><Card.Title>{title}</Card.Title></h4>
                    <span className="text-danger">
                    </span>
                  </div>
                  <h6 className="text-success">Stock Disponible</h6>
                  <div className="d-flex flex-column mt-4">
                  <MDBBtn color="primary" size="sm" style={{ backgroundColor: '#58A4B0' , border:'none' }}>
                      Agregar al Carrito
                  </MDBBtn>
                  

                  <MDBBtn outline color="#58A4B0" size="sm" className="mt-2" style={{ borderColor: '#58A4B0', color: '#58A4B0' }}>
                    
                    Ver Más
                  </MDBBtn>
                
                  </div>
                </MDBCol>
              </MDBRow>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

  );
}

