import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import {
  MDBCard,
  MDBCardHeader,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const DataTable = ({ presupuestos }) => {
  const navigate = useNavigate();
  const handleRowClick = (key) => {
    navigate(`${key}`);
  }

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = presupuestos.slice(offset, offset + itemsPerPage);

  const getRowBackgroundColor = (estado) => {
    if (estado === "PROGRESO") {
      return "text-warning"; // Amarillo
    } else if (estado === "COMPLETADO") {
      return "text-success"; // Verde
    }
    return "";
  };

  return (
    <MDBCard className="my-4 p-3">
      <MDBCardHeader className="bg-primary text-white">Presupuestos</MDBCardHeader>
      <Table responsive striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((presupuesto) => (
            <tr
              key={presupuesto.id}
              onClick={() => handleRowClick(presupuesto.id)}
              className={`cursor-pointer ${getRowBackgroundColor(presupuesto.status)}`}
            >
              <td>{presupuesto.id}</td>
              <td>{presupuesto.name}</td>
              <td className={`cursor-pointer ${getRowBackgroundColor(presupuesto.status)}`}>{presupuesto.status}</td>
              <td>{presupuesto.speciality.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination justify-content-center">
        <ReactPaginate
          activeClassName={'active'}
          breakClassName={'item break-me'}
          previousLabel={' Anterior '}
          nextLabel={' Siguiente '}
          breakLabel={'...'}
          pageCount={Math.ceil(presupuestos.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'item pagination-page'}
          previousClassName={"item previous"}
          nextClassName={"item"}
        />
      </div>
    </MDBCard>
  );
};

export default DataTable;
