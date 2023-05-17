import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
function DetalleProducto(props) {


  const elementId = useParams();
  const [element, setElement] = useState(null);

  useEffect(() =>{
    getElement()
  }, [elementId])

  const getElement = async () => {
    let response = await fetch()

  }




  return (
    /*

HTML CON FUNCS ASI {}
*/
    <div>
    <h1>este item es {props.name}</h1>
    </div>
  )
}

DetalleProducto.propTypes = {}

export default DetalleProducto
