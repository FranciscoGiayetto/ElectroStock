import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import Table from 'react-bootstrap/Table';

import {
  MDBIcon,
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdb-react-ui-kit';
import { useAuthStore } from '../../store/auth';

// ... (imports and other code)

const PrestamosALV = () => {
  const api = useAxios();
  const [element, setElement] = useState([]);
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  useEffect(() => {
    getElement();
  }, []);

  const getElement = async () => {
    try {
      const response = await api.get(`/prestamosHistorial/${userData.user_id}`);
      let data = await response.data;
      setElement(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const userData = user();

  // Función para formatear una cadena de fecha y hora en solo fecha
  const formatDate = (datetimeString) => {
    const dateObject = new Date(datetimeString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return (
    <MDBCard alignment='left' style={{ backgroundColor: '#018195', border: 'none' , minWidth: '98vh' }}>
      <MDBCardHeader style={{ color: 'white' }}>Prestamos</MDBCardHeader>
      <Table hover style={{ marginBottom: '0', height: '100%' }}>
        <thead>
          <tr>
            <th scope='col'>Fecha</th>
            <th scope='col'>Producto</th>
            <th scope='col'>Cantidad</th>
            <th scope='col'>Vencimiento</th>
            <th scope='col'>Estado</th>
          </tr>
        </thead>
        <tbody>
          {element.slice(-4).map((item, index) => (
            <tr key={index}>
              <td>{formatDate(item.dateIn)}</td>
              <td>{item.box.name}</td>
              <td>{item.quantity}</td>
              <td>{item.dateIn}</td>
              <td>
                {item.status === 'PED' ? (
                  <span style={{ display: 'inline-block', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green' }} />
                ) : item.status === 'VEN' ? (
                  <span style={{ display: 'inline-block', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'red' }} />
                ) : (
                  ''
                )}
              
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MDBCard>
  );
};

export default PrestamosALV();
