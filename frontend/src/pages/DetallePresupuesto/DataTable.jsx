import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import {
  MDBCard,
  MDBCardHeader,
} from 'mdb-react-ui-kit';
import useAxios from '../../utils/useAxios.js';
import { useParams, useNavigate } from 'react-router-dom';

const DataTable = ({ presupuesto, onUpdate }) => {
  const [budgetStatus,  setBudgetStatus] = useState("");
  const [budgetName,  setBudgetName] = useState("");

  
  useEffect(() => {
    try {
      if (presupuesto && presupuesto.length > 0) {
        setBudgetName(presupuesto[0].budget.name);
        setBudgetStatus(presupuesto[0].budget.status);
      } else {
        setBudgetName("a"); // Establece un valor predeterminado si no hay datos de presupuesto
        setBudgetStatus(""); // Establece un valor predeterminado si no hay datos de presupuesto
      }
    } catch (error) {
      console.error(error);
    }
  }, [presupuesto]);

  const getClassByEstado = (estado) => {
    if (estado === "COMPRADO") {
      return "table-success"; // Clase para colorear en verde
    } else if (estado === "PENDIENTE") {
      return "table-warning"; // Clase para colorear en naranja
    }
    return ""; // Sin color si no es "COMPRADO" ni "PENDIENTE"
  };
  

  const api = useAxios();
  const [filter, setFilter] = useState(''); // Estado para el filtro de búsqueda
  const { id } = useParams();
 

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

  const handleBudgetStatusChange = async () => {
    try {
      const nuevoEstado = budgetStatus === 'PROGRESO' ? 'COMPLETADO' : 'PROGRESO';
      setBudgetStatus(nuevoEstado);
      await api.put(`/budget/${id}/`, { status: nuevoEstado });
      
    } catch (error) {
      console.error(error);
    }
  };


  const handleItemDelete = async (log_id) => {
    try {
      await api.delete(`/budgetlog/${log_id}`);
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemCompra = async (log_id, estadoActual) => {
    
    try {
      const nuevoEstado = estadoActual === "COMPRADO" ? "PENDIENTE" : "COMPRADO";

      await api.put(`/budgetlog/${log_id}/`, { status: nuevoEstado });
      onUpdate();
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
        <MDBCardHeader className="bg-primary text-white">
          <div>
          Detalle del Presupuesto: {budgetName}
        <button
    onClick={handleBudgetStatusChange}
    className={`btn btn-sm ${budgetStatus === 'PROGRESO' ? 'btn-warning' : 'btn-success'}`}
    style={{ float: 'right' }}
  >
    {budgetStatus === 'PROGRESO' ? 'PROGRESO' : 'COMPLETADO'}
  </button>
  </div>

        </MDBCardHeader>

        <div className="text-center mb-3" style={{ paddingTop: '1rem' }}>
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
              <tr key={index} className={getClassByEstado(item.status)}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleItemDelete(item.id)} className="btn btn-danger btn-sm">Eliminar</button>
                  <button  onClick={() => handleItemCompra(item.id, item.status)} className={`btn btn-sm ${item.status === 'COMPRADO' ? 'btn-success' : 'btn-warning'}`}>
                {item.status === 'COMPRADO' ? 'COMPRADO' : 'PENDIENTE'}
              </button>
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
