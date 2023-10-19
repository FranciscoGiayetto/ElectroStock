import { Link } from 'react-router-dom';
import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function CardExample(props) {
  const { id, title, image, inStock } = props;
  return (
    <div className="container-fluid">
      <div className="row justify-content-end mb-3">
        <div className="col-md-12 col-xl-10">
          <Card className="shadow-sm border rounded-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-3 mb-4 mb-lg-0">
                  <div className="bg-image rounded hover-zoom hover-overlay">
                    <Link to={`/detalleProducto/${id}`}>
                      <Card.Img
                        src={image}
                        fluid
                        className="w-100"
                      />
                    </Link>
                    <div>
                      <div
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="col border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">{title}</h4>
                    <span className="text-danger"></span>
                  </div>
                  <h6 className={inStock ?   "text-success" : "text-danger"}>
        {inStock ? "Stock Disponible" : "Stock No Disponible"}
      </h6>
                  <div className="d-flex flex-column mt-4">
                    <Link to={`/detalleProducto/${id}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-100"
                        style={{ backgroundColor: '#58A4B0', border: 'none' }}
                      >
                        Agregar al Carrito
                      </Button>
                    </Link>
                    <Link to={`/detalleProducto/${id}`}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="mt-2 w-100"
                        style={{
                          borderColor: '#58A4B0',
                          color: '#58A4B0',
                          backgroundColor: 'white', // Color de fondo en estado normal
                        }}
                      >
                        Ver Más
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}