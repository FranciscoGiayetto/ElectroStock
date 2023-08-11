import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import {
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

const CardVencidos = () => {
    const api = useAxios();
    const  userId  = 1;
    const [element, setElement] = useState([]);

    useEffect(() => {
        getElement();
    }, []);

const getElement = async () => {
    try {
        const response = await api.get(`/vencidos/${userId}`);
        const data = response.data.map(category => ({
        ...category,
        }));
        setElement(data);
        console.log(data)
    } catch (error) {
        console.error(error);
    }
};

        

  return (
    <MDBCard alignment='left'>
      <MDBCardHeader>Vencidos</MDBCardHeader>
      <MDBTable hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Nombre</th>
          <th scope='col'>Producto</th>
          <th scope='col'>Cantidad</th>
          
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <th scope='row'>1</th>
          <td>Mark</td>
          <td>Otto</td>
          
        </tr>
        <tr>
          <th scope='row'>2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          
        </tr>
        <tr>
          <th scope='row'>3</th>
          <td>@twitter</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
    </MDBCard>
  );
}

export default  CardVencidos;