import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import {
  MDBCard,
  MDBCardHeader,
} from 'mdb-react-ui-kit';
import useAxios from '../../utils/useAxios.js';
import { useParams, useNavigate } from 'react-router-dom';


const DataTable = ({ presupuesto }) => {
  console.log(presupuesto)  
  const api = useAxios();
  const [filter, setFilter] = useState(''); // Estado para el filtro de búsqueda
  const {id} = useParams();
  const calcularPrecioTotal = () => {
    let total = 0;
    for (const item of presupuesto) {
      total += item.quantity * parseFloat(item.price);
    }
    return total.toFixed(2);
  };

  // Función para manejar cambios en el filtro de búsqueda
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };


  const handleItemDelete = async (log_id) => {
    const body = {
        log_id: 5
      };
    try {
      await api.delete(`/budgetlog/${id}`,body);
       // Vuelve a obtener el carrito actualizado
    } catch (error) {
      console.error(error);
    }
  };

  // Filtrar los elementos basados en el filtro de búsqueda
  const filteredPresupuesto = presupuesto.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <MDBCard
        className="my-4 p-3"
        alignment='left'
        style={{
          maxHeight: '600px',
          overflowY: 'auto',
        }}
      >
        <MDBCardHeader className="bg-primary text-white">Detalle del Presupuesto</MDBCardHeader>

        <div className="text-center mb-3" style={{ paddingTop: '1rem'}}>
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            value={filter}
            onChange={handleFilterChange}
            style={{ width: '60%', display: 'inline-block' }}
          />
        </div>

        <Table responsive striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPresupuesto.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleItemDelete(index)} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky-tfoot">
            <tr>
              <td colSpan="4"></td>
              <th>Total:</th>
              <td>{calcularPrecioTotal()}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
      </MDBCard>
    </div>
  );
};

export default DataTable;
