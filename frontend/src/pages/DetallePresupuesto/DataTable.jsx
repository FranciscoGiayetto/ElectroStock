import React, { useState, useEffect, useRef} from 'react';
import Table from 'react-bootstrap/Table';
import {
  MDBCard,
  MDBCardHeader,
} from 'mdb-react-ui-kit';
import useAxios from '../../utils/useAxios.js';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HiPlusCircle, HiPencil,HiOutlineXMark,HiMiniCheck } from "react-icons/hi2";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IosShareIcon from '@mui/icons-material/IosShare';
import ModalListItems from './ModalListItems'; 
import "./DataTable2.css";

import * as XLSX from 'xlsx';



const DataTable = ({ presupuesto,elements, onUpdate }) => {
  const [budgetStatus,  setBudgetStatus] = useState("");
  const [budgetName,  setBudgetName] = useState("");
  const [budgetLogs, setBudgetLogs] = useState([]);
  const [editingRows, setEditingRows] = useState({});
  const [editedValues, setEditedValues] = useState({});
  const [isEditingBudgetName, setIsEditingBudgetName] = useState(false);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customName, setCustomName] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
 
  const nameInputRef = useRef(null);
  useEffect(() => {
    try {
      setBudgetName(presupuesto.budget_details.name);
      setBudgetStatus(presupuesto.budget_details.status);
      // Agregar el campo "isNew" a los elementos del presupuesto
      const budgetLogsWithIsNewFlag = presupuesto.budget_logs.map((item) => ({
        ...item,
        isNew: !item.element, // Comprueba si el campo "element" está presente o no
      }));
      setBudgetLogs(budgetLogsWithIsNewFlag);
    } catch (error) {
      console.error(error);
    }
  }, [presupuesto]);

  const renderNameField = (item) => {
    if (editingRows[item.id]) {
      if (item.isNew) {
        return (
          <input
            type="text"
            style={{ maxWidth: "300px" }}
            className="form-control"
            value={editedValues[item.id]?.name || item.name}
            onChange={(e) => handleItemInputChange(item.id, "name", e.target.value)}
          />
        );
      } else {
        return (
          <input
            type="text"
            style={{ maxWidth: "300px" }}
            className="form-control disabled-input"
            value={item.name}
            disabled
            />
          );
      }
    } else {
      return item.name;
    }
  };


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
 
  const activateBudgetNameEditing = () => {
    setIsEditingBudgetName(true);
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };
  const saveBudgetName = async () => {
    try {
      setIsEditingBudgetName(false);
      await api.put(`/budget/${id}/`, { name: budgetName });
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemEdit = (log_id) => {
    // Activa la edición para la fila correspondiente
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [log_id]: true,
    }));
  };

  const handleItemSave = async (log_id) => {
    try {
      const editedItem = editedValues[log_id];
      // Realiza la solicitud PUT a la base de datos con los valores editados
      await api.put(`/budgetlog/${log_id}/`, editedItem);
      onUpdate();
      // Desactiva la edición para la fila correspondiente
      setEditingRows((prevEditingRows) => ({
        ...prevEditingRows,
        [log_id]: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleItemInputChange = (log_id, field, value) => {
    // Actualiza los valores editados para la fila correspondiente
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
      [log_id]: {
        ...prevEditedValues[log_id],
        [field]: value,
      },
    }));
  };
  

  const calcularPrecioTotal = () => {
    let total = 0;
    for (const item of budgetLogs) {
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

      if (nuevoEstado === 'COMPLETADO') {
        // Cuando se completa el presupuesto, desactiva la edición de todos los elementos
        // y cambia su estado a "COMPRADO"
        setEditingRows({});
       
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleNewItem = () => {
    
    // Comprueba si ya estás en modo de edición del nuevo registro
    if (!isAddingNewItem) {
      // Habilita el modo de edición para el nuevo registro
      setIsAddingNewItem(true);
    
    }
  };


  const handleCancelNewItem = () => {
    setIsAddingNewItem(false); // Cancela la adición de un nuevo elemento
  
    // Borra los valores del elemento nuevo para restablecerlos
    setEditedValues({ ...editedValues, 'new': {} });
  
    // Restablece el estado de customName a true para habilitar el campo de entrada del nombre
    setCustomName(true);
  
    // Reinicia el estado del elemento seleccionado a null
    setSelectedItem(null);
  };
  
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  const handleItemSelect = (selectedItem) => {
    console.log('Elemento seleccionado:', selectedItem);
    setSelectedItem(selectedItem);
    setCustomName(false);
    // Actualiza el input del Nombre con el nombre del elemento seleccionado
    setEditedValues({
      ...editedValues,
      'new': {
        ...editedValues['new'],
        'name': selectedItem.name,
      },
    });
    // Deshabilita la edición del campo "Nombre"
    
  };
  const handleConfirmNewItem = async () => {
    if (customName) {
      const newLog = {
        ...editedValues['new'],
        budget: presupuesto.budget_details.id,
        status: "PENDIENTE",
      
      };
      // Caso de nombre personalizado
      // Valida los campos y realiza la solicitud POST si son válidos
      if (!editedValues['new']?.name || editedValues['new']?.name.trim() === '') {
        console.error("El campo 'Nombre' es obligatorio.");
        return;
      }
  
      if (!editedValues['new']?.price || isNaN(parseFloat(editedValues['new']?.price)) || parseFloat(editedValues['new']?.price) < 0) {
        console.error("El campo 'Precio' debe ser un número válido mayor o igual a cero.");
        return;
      }
  
      if (!editedValues['new']?.quantity || isNaN(parseInt(editedValues['new']?.quantity)) || parseInt(editedValues['new']?.quantity) <= 0) {
        console.error("El campo 'Cantidad' debe ser un número válido mayor a cero.");
        return;
      }
  
      // Luego, si todos los campos son válidos, procedes a realizar la solicitud POST
      try {
        const response = await api.post("/budgetlog/create/", newLog);
        const createdItem = response.data;
  
        setBudgetLogs([...budgetLogs, createdItem]);
        setIsAddingNewItem(false);
        setEditedValues({ ...editedValues, 'new': {} });
      } catch (error) {
        console.error(error);
      }
    } else if (selectedItem) {
      // Caso de elemento seleccionado
      const newLog = {
        ...editedValues['new'],
        budget: presupuesto.budget_details.id,
        status: "PENDIENTE",
        element: selectedItem.id, // Agrega la FK del elemento seleccionado
      };
  
      // Valida los campos del nuevo registro según el modelo de Django
      if (!newLog.price || isNaN(parseFloat(newLog.price)) || parseFloat(newLog.price) < 0) {
        console.error("El campo 'Precio' debe ser un número válido mayor o igual a cero.");
        return;
      }
  
      if (!newLog.quantity || isNaN(parseInt(newLog.quantity)) || parseInt(newLog.quantity) <= 0) {
        console.error("El campo 'Cantidad' debe ser un número válido mayor a cero.");
        return;
      }
  
      try {
        const response = await api.post("/budgetlog/create/", newLog);
        const createdItem = response.data;
  
        setBudgetLogs([...budgetLogs, createdItem]);
        setIsAddingNewItem(false);
        setCustomName(true);
        setEditedValues({ ...editedValues, 'new': {} });
      } catch (error) {
        console.error(error);
      }
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
  const filteredPresupuesto = budgetLogs.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const exportToExcel = () => {
    const data = filteredPresupuesto.map((item, index) => {
      return {
        'N°': index + 1,
        'Nombre': item.name,
        'Precio': item.price,
        'Stock': item.quantity,
        'Subtotal': (item.quantity * parseFloat(item.price)).toFixed(2),
      };
    });
  
    // Agregar una fila vacía de separación
    data.push({});
  
    // Agregar una fila al final con el total
    const total = data.reduce((sum, row) => sum + parseFloat(row['Subtotal'] || 0), 0);
    data.push({ 'Nombre': 'Total', 'Subtotal': total.toFixed(2) });
  
    const ws = XLSX.utils.json_to_sheet(data);
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `presupuesto (${budgetName})`); // Aquí se establece el nombre del archivo
  
    // Write the workbook as a binary string
    const binaryString = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
    // Convert the binary string to an ArrayBuffer
    const buffer = new ArrayBuffer(binaryString.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i != binaryString.length; ++i) {
      view[i] = binaryString.charCodeAt(i) & 0xFF;
    }
  
    // Create a Blob from the ArrayBuffer
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
  
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presupuesto: (${budgetName}).xlsx`; // Establecer el nombre de descarga del archivo
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  
  
  
  
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
        <MDBCardHeader className="text-white sub-blue-its">
        <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ margin: '0 10px 0 0' }}>
      Nombre del Presupuesto:
    </div>
    {isEditingBudgetName ? (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          className="form-control"
          ref={nameInputRef}
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          onBlur={saveBudgetName}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              saveBudgetName();
            }
          }}
          style={{
            maxWidth: "300px"
          }}
        />
          <HiMiniCheck
      onClick={saveBudgetName} // Hacer clic en el ícono aceptará el input
      style={{ cursor: 'pointer', marginLeft: '0.5rem' }}
    />
      </div>
    ) : (
      <div
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: '6px' }}
        onDoubleClick={activateBudgetNameEditing}
      >
        {budgetName}
        <HiPencil
          onClick={() => setIsEditingBudgetName(true)}
          style={{ cursor: 'pointer', marginLeft: '1rem' }}
        />
        
          <DeleteRoundedIcon style={{marginLeft:'15px'}}/>
        
      </div>
    )}
            <IosShareIcon
  data-toggle="tooltip"
  data-placement="right"
  title="Exportar"
  style={{ marginLeft: '325px', cursor: 'pointer' }}
  onClick={exportToExcel}
/>

            
            
            <button
              onClick={handleBudgetStatusChange}
              className={`btn btn-sm ${budgetStatus === 'PROGRESO' ? 'btn-warning' : 'btn-success'}`}
              style={{
                marginLeft: 'auto'
              }}
              data-toggle="tooltip" data-placement="top" title="Estado del presupuesto"
            >
              {budgetStatus === 'PROGRESO' ? 'EN PROGRESO' : 'COMPLETADO'}
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
          {!isAddingNewItem && budgetStatus !== 'COMPLETADO' && (
            <div className="hover-scale" onClick={handleNewItem}>
              <HiPlusCircle style={{ fontSize: "2rem" }} />
            </div>
          )}
        </div>

        <div style={{ overflowX: 'auto' }}>
        <Table responsive striped bordered hover className="mt-3 table-responsive">
          <thead>
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="d-none d-md-table-cell">Subtotal</th>
              {budgetStatus !== 'COMPLETADO' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {filteredPresupuesto.map((item, index) => (
              <tr key={item.id} className={getClassByEstado(item.status)}>
                <td>{index + 1}</td>
                <td>{renderNameField(item)}</td>
                <td>
                  {editingRows[item.id] ? (
                    <input
                      type="number"
                      style={{ maxWidth: "100px" }}
                      className="form-control"
                      value={editedValues[item.id]?.price || item.price}
                      onChange={(e) =>
                        handleItemInputChange(item.id, "price", e.target.value)
                      }
                      disabled={budgetStatus === 'COMPLETADO'}
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td>
                  {editingRows[item.id] ? (
                    <input
                      type="number"
                      className="form-control"
                      style={{ maxWidth: "100px" }}
                      value={editedValues[item.id]?.quantity || item.quantity}
                      onChange={(e) =>
                        handleItemInputChange(item.id, "quantity", e.target.value)
                      }
                      disabled={budgetStatus === 'COMPLETADO'}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="d-none d-md-table-cell">{(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                {budgetStatus !== 'COMPLETADO' && (
                  <td>
                    {editingRows[item.id] ? (
                      <button
                        onClick={() => handleItemSave(item.id)}
                        className="btn btn-success btn-sm"
                      >
                        <HiMiniCheck></HiMiniCheck>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleItemEdit(item.id)}
                        className="btn btn-primary btn-sm sub-blue-its"
                      >
                        <HiPencil></HiPencil>
                      </button>
                    )}
                    <button
                      onClick={() => handleItemDelete(item.id)}
                      className="btn btn-danger btn-sm ml-2"
                      disabled={budgetStatus === 'COMPLETADO'}
                    >
                      <HiOutlineXMark></HiOutlineXMark>
                    </button>
                    <button
                      onClick={() => handleItemCompra(item.id, item.status)}
                      className={`btn btn-sm ${item.status === 'COMPRADO' ? 'btn-success' : 'btn-warning'}`}
                      disabled={budgetStatus === 'COMPLETADO'}
                    >
                      {item.status === 'COMPRADO' ? 'COMPRADO' : 'PENDIENTE'}
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {isAddingNewItem && (
              <tr className="table-info">
                <td>{budgetLogs.length + 1}</td>
                <td style={{ display: "flex"}}>
                  <input
                    type="text"
                    className={`form-control ${isAddingNewItem && customName ? '' : 'disabled-input'}`}
                    style={{ maxWidth: "200px", paddingRight: "1rem" }}
                    value={customName ? (editedValues['new']?.name || "") : selectedItem?.name}
                    onChange={(e) =>
                      handleItemInputChange('new', "name", e.target.value)
                    }
                    disabled={!customName || budgetStatus === 'COMPLETADO'}
                  />
                  <button onClick={() => setIsModalOpen(true)} className="btn btn-sm">
                    <HiPlusCircle style={{ fontSize: "1rem" }} />
                  </button>
                </td>
                <td>
                  <input
                    type="number"
                    style={{ maxWidth: "100px" }}
                    className="form-control"
                    value={editedValues['new']?.price || ""}
                    onChange={(e) =>
                      handleItemInputChange('new', "price", e.target.value)
                    }
                    disabled={budgetStatus === 'COMPLETADO'}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    style={{ maxWidth: "100px" }}
                    className="form-control"
                    value={editedValues['new']?.quantity || ""}
                    onChange={(e) =>
                      handleItemInputChange('new', "quantity", e.target.value)
                    }
                    disabled={budgetStatus === 'COMPLETADO'}
                  />
                </td>
                <td className="d-none d-md-table-cell">{/* Cálculo del total */}</td>
                {budgetStatus !== 'COMPLETADO' && (
                  <td>
                    <button
                      onClick={handleCancelNewItem}
                      className="btn btn-danger btn-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleConfirmNewItem}
                      className="btn btn-success btn-sm"
                    >
                      Confirmar nuevo log
                    </button>
                  </td>
                )}
              </tr>
            )}
          </tbody>
          <tfoot className="sticky-tfoot">
            <tr>
              <td colSpan="3"></td>
              <th>Total:</th>
              <td>{calcularPrecioTotal()}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
        </div>
      </MDBCard>
      {isModalOpen && (
        <ModalListItems
          elements={elements}
          onItemSelect={handleItemSelect}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DataTable;
