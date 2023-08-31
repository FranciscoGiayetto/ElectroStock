import React from 'react';

import './CardPrestamos.css'
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import fotoPrueba2 from '../../assets/fotoPrueba2.jpg';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Button from 'react-bootstrap/Button';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> </link>
</head>

export default function CardPrestamos(props) {
  return (
    <MDBCard border='none' style={{ fontFamily:'Roboto, sans-serif', fontSize:'0.938rem', boxShadow:'0 2px 4px rgba(0, 0, 0, 0.05)'}}>
      
      
        <Table className='card-table'>
          <tbody>
            <tr>
              <td>{props.dateIn}</td>
            </tr>
          </tbody>
        </Table>
        <Stack direction='horizontal' gap={4}>
          <div className='p-2' style={{marginLeft:'0.5rem', marginRight:'1rem'}}>
            <img src={fotoPrueba2} alt="Paisaje" style={{width:'10rem'}}/>
          </div>
          <Stack>
            <div style={{marginTop:'0.2rem', marginRight:'1rem'}}>
              <p style={{fontSize:'0.938rem', color:'#45BE7F', margin:'0'}}>{props.status}</p>
              <p style={{fontSize:'0.938rem'}}>{props.quantity}</p>
            </div>
          </Stack>
          <Stack>
            <div style={{marginTop:'0.2rem', marginRight:'1rem'}}>
              <p style={{fontSize:'0.938rem', margin:'0'}}>{props.profeNombre} {props.profeApellido}</p>
              <p style={{fontSize:'0.938rem', margin:'0'}}>{props.specialties}</p>
            </div>
          </Stack>
          <Stack>
            <div style={{marginTop:'0.2rem', marginRight:'1rem'}}>
              <p style={{fontSize:'0.938rem', margin:'0'}}>Nacho no sabe que poner</p>
              <p style={{fontSize:'0.938rem', margin:'0'}}>Asi que hasta que no lo complete</p>
              <p style={{fontSize:'0.938rem'}}>Yo tampoco</p>
            </div>
          </Stack>
          <Stack style={{marginRight:'1rem'}}>
            <div style={{marginTop:'0.5rem'}}>
              <Button
                className='botonCarrito'
                style={{ fontSize:'0.938rem', backgroundColor: '#58A4B0', border: 'none', width:'9.813rem', height:'2.5rem' }}
                variant='primary'
                type='submit'
              >
                Agregar al carrito
              </Button>
            </div>
            <div style={{marginTop:'0.5rem'}}>
              <Button
                className='botonCarrito'
                style={{ fontSize:'0.938rem', backgroundColor: '#58A4B0', border: 'none', width:'9.813rem', height:'2.5rem' }}
                variant='primary'
                type='submit'
              >
                Ver préstamo
              </Button>
            </div>
          </Stack>
        </Stack>
      
    </MDBCard>
  );
}