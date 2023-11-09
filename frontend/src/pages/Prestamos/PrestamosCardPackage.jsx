import React from 'react';
import './PrestamosCard.css';
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

const PrestamosCardPackage = ({ onClick, cliente, dateIn, dateOut, count, name, status, image, lista }) => {
  const renderComponentList = () => {
    return lista.slice(0, 5).map((item, index) => {
      const componentName = item.box.element.name.length > 18 ? item.box.element.name.slice(0, 18) + '...' : item.box.name;
      return (
        <p key={index}>{componentName}</p>
      );
    });
  };

  const moreComponentsMessage = lista.length > 5 ? `+${lista.length - 5} more components` : null;

  return (
    <div className='prestamo-card' onClick={onClick}>
      <div className='img-container'>
        <MDBRow className="justify-content-center mb-0">
          <MDBCol md="12" xl="10">
            <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="12" lg="3"  className="mb-4 mb-lg-0">
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom hover-overlay">
                      <MDBCardImage
                        src={image}
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
                    <h5>Prestamo de {name}</h5>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                        <MDBIcon fas icon="star" />
                      </div>
                    </div>
                    <div className="mt-1 mb-0 text-muted">
                      <span><p>Estado: {status}</p></span>
                   
                    </div>
                    <span>Fecha:{dateIn}</span>
                    <span className="text-primary"> • </span>
                    <span className="text-primary"> • </span>
                    <span>
                    </span>
                    <span>
                      Cantidad de Componentes: {count}
                      <br />
                    </span>
                    <div>
                    </div>
                  </MDBCol>
                  <MDBCol
                    md="6"
                    lg="3"
                    className="border-sm-start-none border-start"
                  >
                   
                    <div className="d-flex flex-column mt-4">
                      {renderComponentList()}
                      {moreComponentsMessage && <p>{moreComponentsMessage}</p>}
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

export default PrestamosCardPackage;
