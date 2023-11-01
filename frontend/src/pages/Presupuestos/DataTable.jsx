import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import {
  MDBCard,
  MDBCardHeader,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { HiPlusCircle } from "react-icons/hi2";
import useAxios from '../../utils/useAxios';
const DataTable = ({ presupuestos }) => {
  let api = useAxios();
  const navigate = useNavigate();
  const handleRowClick = (key) => {
    navigate(`${key}`);
  }

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [postRes, setPostRes] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');


  const getRowTextColor = (estado) => {
    if (estado === "PROGRESO") {
      return "text-warning"; // Amarillo
    } else if (estado === "COMPLETADO") {
      return "text-success"; // Verde
    }
    return ""; // El color de texto predeterminado
  };


  const handleNewBudget = async () => {

    const maxNumber = presupuestos.reduce((max, presupuesto) => {
      const name = presupuesto.name;
      if (name.startsWith("Presupuesto Sin Nombre ")) {
        const number = parseInt(name.replace("Presupuesto Sin Nombre ", ""), 10);
        return !isNaN(number) && number > max ? number : max;
      }
      return max;
    }, 0);

    const nextNum = maxNumber + 1;
    // Define los datos del nuevo presupuesto
    const newBudgetData = {
      name: `Presupuesto Sin Nombre ${nextNum}`,
      status: "PROGRESO", // O "COMPLETADO" según sea necesario
      speciality: 1, // Reemplaza 'specialityId' con el ID de la especialidad correspondiente
    };
  
    try {
      // Realiza la solicitud POST para crear un nuevo presupuesto
      const response = await api.post('/budget/', newBudgetData);
      const newBudgetId = response.data.id;

      // Muestra la respuesta del servidor en la consola
      console.log(response.data);
  
      // Realiza una acción de redirección a '/tienda' o ajusta según sea necesario
      navigate(`${newBudgetId}`);
    } catch (error) {
      // En caso de error, muestra el mensaje de error en la consola
      console.error(error);
  
      // Puedes manejar el error y mostrar un mensaje de error al usuario si es necesario
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;

  // Función para ordenar los datos en función del estado de clasificación y la columna seleccionada
  const sortedData = () => {
    if (!sortColumn) {
      return presupuestos.slice(offset, offset + itemsPerPage);
    }
    
    return [...presupuestos].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    }).slice(offset, offset + itemsPerPage);
  };

  // Función para cambiar el filtro de clasificación
  const handleSortChange = (column) => {
    if (column === sortColumn) {
      // Si hacemos clic en la misma columna, cambia la dirección de ordenamiento
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si hacemos clic en una nueva columna, establece la columna y la dirección de ordenamiento predeterminada (ascendente)
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <MDBCard className="my-4 p-3" >
     <MDBCardHeader style={{fontSize:"2rem"}} className="bg-primary text-white d-flex justify-content-between align-items-center">
  <span>Presupuestos</span>
  <div className="hover-scale" onClick={handleNewBudget}>
  <HiPlusCircle data-toggle="tooltip" data-placement="right" title="Agregar presupuesto"/>
  </div>
</MDBCardHeader>

      <Table responsive striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th scope='col' onClick={() => handleSortChange('id')}>
              ID {sortColumn === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th scope='col' onClick={() => handleSortChange('name')}>
              Nombre {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th scope='col' onClick={() => handleSortChange('status')}>
              Estado {sortColumn === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th scope='col' onClick={() => handleSortChange('speciality.name')}>
              Especialidad {sortColumn === 'speciality.name' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((presupuesto) => (
            <tr
              key={presupuesto.id}
              onClick={() => handleRowClick(presupuesto.id)}
              className={`cursor-pointer`}
            >
              <td>{presupuesto.id}</td>
              <td>{presupuesto.name}</td>
              <td className={`${getRowTextColor(presupuesto.status)}`}>{presupuesto.status}</td>
              <td >{presupuesto.speciality.name}</td>
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
