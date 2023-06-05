import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import defaultpicture from '../../assets/images/defaultpicture.png';
import './DetalleProducto.css';
function DetalleProducto() {
  const elementId = useParams();
  const [element, setElement] = useState(null);

  useEffect(() => {
    getElement();
  }, [elementId]);

  const getElement = async () => {
    const proxyUrl = 'http://127.0.0.1:8000';
    let response = await fetch(`${proxyUrl}/api/elements/${elementId.id}/`);
    let data = await response.json();
    setElement(data);
  };

  return (
    <div className="container pagecontainer">
      {element && (
        <div className="product-details">
          <h1 className="product-details__title">{element.name}</h1>
          <p className="product-details__description">{element.description}</p>
          <p className="product-details__category">Categoría: {element.category}</p>
          <p className="product-details__stock">Stock: {15}</p> 
          {
          //element.stock
          }

          <div className="product-details__image-container">
            <img
              src={element.image || defaultpicture}
              alt="Imagen"
              className="product-details__image"
            />
          </div>
        </div>
      )}
    </div>
  );
}

DetalleProducto.propTypes = {};

export default DetalleProducto;
