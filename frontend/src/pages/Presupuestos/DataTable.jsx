import React from 'react';
import Table from 'react-bootstrap/Table';
import {
  MDBCard,
  MDBCardHeader,
} from 'mdb-react-ui-kit';

const DataTable = ({ presupuestos }) => {
  return (
    <MDBCard alignment='left' style={{ backgroundColor: '#018195', border: 'none', minWidth: '98vh' }}>
      <MDBCardHeader style={{ color: 'white' }}>Presupuestos</MDBCardHeader>
      <Table hover style={{ marginBottom: '0', height: '100%' }}>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {presupuestos.map((presupuesto) => (
            <tr key={presupuesto.id}>
              <td>{presupuesto.id}</td>
              <td>{presupuesto.name}</td>
              <td>{presupuesto.status}</td>
              <td>{presupuesto.speciality}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MDBCard>
  );
};

export default DataTable;
