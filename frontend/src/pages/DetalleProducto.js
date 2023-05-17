import PropTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
function DetalleProducto() {


  const elementId = useParams();
  const [element, setElement] = useState(null);

  useEffect(() =>{
   
    getElement()
    console.log(element)
  }, [elementId])

  const getElement = async () => {
    const proxyUrl = 'http://127.0.0.1:8000';
    let response = await fetch(`${proxyUrl}/api/elementsDetalle/${elementId.id}/`);
    let data = await response.json();
    setElement(data);
    console.log(data)

  }



 
  return (
    <div>
      {element && (
        <>
          <h1>Nombre: {element.name}</h1>
          <h1>Descripción: {element.description}</h1>
          <h1>Subcategoria: {element.subcategory["subcategory"]}</h1>
          <h1>Stock: {element.stock}</h1>
          <img
            src={element.image}
            alt="Imagen"
            style={{
              maxWidth: '30%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </>
      )}
    </div>
  );
}
DetalleProducto.propTypes = {}

export default DetalleProducto
