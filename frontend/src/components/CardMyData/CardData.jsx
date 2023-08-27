
import React from 'react';

import './CardData.css'
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
} from 'mdb-react-ui-kit';
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> </link>
</head>

export default function CardMyData() {
  return(
    
    <MDBCard className="card-user" alignment='left' border='none' style={{fontFamily: 'Roboto, sans-serif'}}>
      <MDBCardHeader className="card-header">
        Mis Datos
      </MDBCardHeader>
      
      <Table hover className="card-table">
      
        <tbody>
          <tr>
            <th scope='col'>Email:</th>
            <td scope='col'>franco.moralesdemaria@gmail.com</td>
            <td scope='col'><EditIcon style={{color:'#2E5266', fontSize:'0.938rem'}} /></td>
          </tr>
          
          <tr>
            <th scope='col'>Usuario:</th>
            <td scope='col'>Franco Morales Demaria</td>
            <td scope='col'><EditIcon style={{color:'#2E5266', fontSize:'0.938rem'}} /></td>
          </tr>

          <tr>
            <th scope='col'>Contraseña:</th>
            <td scope='col'>**********</td>
            <td scope='col'><EditIcon style={{color:'#2E5266', fontSize:'0.938rem'}} /></td>
          </tr>
        </tbody>
      </Table>
    </MDBCard>
    /* 
    <MDBCard alignment='left' border='none' style={{fontFamily:'Roboto, sans-serif', fontSize:'0.938rem', boxShadow:'0 2px 4px rgba(0, 0, 0, 0.05)'}}>
    <MDBCardHeader style={{backgroundColor:'#018195', color: '#EBEBEB', fontSize:'1.25rem'}}>Mis Datos</MDBCardHeader>
    <Table hover style={{ marginBottom: '0', height: '100%', borderRadius:'1rem' }}> 
      <tbody>  
        <tr>
          <th>Email:</th>  
          <td>franco.moralesdemaria@gmail.com</td>
          <td><EditIcon style={{ fontSize:'0.938rem', color:'#2E5266' }}></EditIcon></td>
        </tr>
        
        <tr>
          <th>Usuario:</th>
          <td>Franco Morales Demaria</td>
          <td><EditIcon style={{ fontSize:'0.938rem', color:'#2E5266' }}></EditIcon></td>
        </tr>

        <tr style={{borderBottom:'transparent'}}>
          <th>Contraseña:</th>
          <td>**********</td>
          <td><EditIcon style={{ fontSize:'0.938rem', color:'#2E5266' }}></EditIcon></td>
        </tr>
      </tbody>
    </Table>
  </MDBCard> */
    
  );
}