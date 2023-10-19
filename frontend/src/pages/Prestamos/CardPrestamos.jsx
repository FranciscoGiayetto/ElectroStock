// CardPrestamos.jsx

import React from 'react';
import './PrestamosCard.css'; // Importa tu archivo CSS
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBRipple,
  MDBBtn, 
} from 'mdb-react-ui-kit';

const PrestamosCard = ({ status,image, cliente,dateIn,name}) => {
  return (
    <div className='prestamo-card'>
        <div className='img-container'>
      <MDBRow className="justify-content-center mb-0">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay">
                    <MDBCardImage
                      src="image"
                      fluid
                      className="w-100"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                <MDBCol md="6">
                  <h5>Prestamo de {cliente}</h5>
                  <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">
                      <MDBIcon fas icon="star" />
                      
                    </div>
                  </div>
                  <div className="mt-1 mb-0 text-muted" >
                    <span><p>Estado: {status}</p></span>
                    <span className="text-primary"> • </span>
                    <span className="text-primary"> • </span>
                  </div>
                    <span>Fecha:{dateIn}</span>
                    <span className="text-primary"> • </span>
                    <span className="text-primary"> • </span>
                    <span>

                    </span>

                    <span>
                      Componente:{name}
                      <br />
                    </span>
                    <div>
                  <p className="text-truncate mb-4 mb-md-0">
                  © Colegio ITS Villada. Todos los derechos reservados. Prohibida la reproducción total o parcial sin autorización escrita.
                  </p>
                  </div>
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                 
                  <h6 className="text-success"> •  • </h6>
                  <div className="d-flex flex-column mt-4">
                    <MDBBtn color="primary" size="sm">
                      Ver prestamo.
                    </MDBBtn>
                    <MDBBtn outline color="primary" size="sm" className="mt-2">
                      Aniadir al carrito
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      
      </div>

    </div>
  );
};

export default PrestamosCard;



