// CardPrestamos.jsx
import React from 'react';

const PrestamosCardProfe = ({ status, image, cliente, dateIn, name }) => {
  const detallePrestamoURL = '/DetallePrestamo';
  return (
    <div className='prestamo-card'>
      <div className='img-container'>
        <div className="container mt-5 mb-3">
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-3 mb-4 mb-lg-0">
                  <div className="bg-image rounded hover-zoom hover-overlay">
                    <img
                      src={image}
                      className="img-fluid w-100"
                      alt="Prestamo Image"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5>Prestamo de {cliente}</h5>
                  <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">
                      <i className="fas fa-star" />
                    </div>
                  </div>
                  <div className="mt-1 mb-0 text-muted">
                    <span><p>Estado: {status}</p></span>
                    <span className="text-primary"> • </span>
                    <span className="text-primary"> • </span>
                  </div>
                  <span>Fecha: {dateIn}</span>
                  <span className="text-primary"> • </span>
                  <span className="text-primary"> • </span>
                  <span>Componente: {name}</span>
                  <br />
                  <p className="text-truncate mb-4 mb-md-0">
                  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                  </p>
                </div>
                <div className="col-md-8 col-lg-3 border-start">
                  <h6 className="text-success"> •  • </h6>
                  <div className="d-flex flex-column mt-4">
                  </div>
                  <div className="d-flex flex-column mt-4">
                  <a href={detallePrestamoURL} className="btn btn-primary btn-sm">Ver prestamo</a>                  </div>
                  <div className="d-flex flex-column mt-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestamosCardProfe;



