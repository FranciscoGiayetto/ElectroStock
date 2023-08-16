import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
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

const CardPrestamos = () => {
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
    <MDBCard alignment='left' style={{ backgroundColor: '#018195'  }}>
      <MDBCardHeader style={{ color: 'white' }}>Prestamos</MDBCardHeader>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope='col'>Fecha</th>
            <th scope='col'>Producto</th>
            <th scope='col'>Cantidad</th>
            <th scope='col'>Vencimiento</th>
            <th scope='col'>Estado</th>

          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {element.slice(-4).map((item, index) => (
            <tr key={index}>
              <td>{formatDate(item.dateOut)}</td> {/* Display formatted date */}
              <td>{item.box.name}</td>
              <td>{item.quantity}</td>
              <td>{item.dateIn}</td> {/* Display formatted date */}
            <td>
            <MDBBadge color='success' pill>
            {item.status }
            </MDBBadge>
          </td>
         

            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBCard>
    
  );
};

export default CardPrestamos;
