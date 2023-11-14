import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import PrestamosCard from './CardPrestamos';

const ModalDetallePrestamo = ({ lista,dateOut, onClose,onHandleApproval ,onHandleRejection}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLista, setFilteredLista] = useState(lista);

  // Función para actualizar la lista filtrada cuando se cambia el término de búsqueda
  useEffect(() => {
    const filtered = lista.filter((element) =>
      element.box.element.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLista(filtered);
  }, [searchTerm, lista]);

  return (
    <Modal show={true} onHide={onClose} size="lg" contentClassName='custom-modal-content '>
      <Modal.Header className="d-flex justify-content-between align-items-center" closeButton>
  <div className="d-flex flex-column">
    <Modal.Title>Prestamos:</Modal.Title>
    <input
      type="text"
      placeholder="Buscar Componente..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: '100%' }}
    />
  </div>
 
  <div style={{ paddingLeft: '10%' }} className="d-flex flex-column flex-sm-row align-items-sm-center">
  <button className="btn btn-success me-sm-2 mb-2 mb-sm-0" onClick={onHandleApproval}>
    <span role="img" aria-label="Checkmark">✅</span> Confirmar
  </button>
  <button className="btn btn-danger me-sm-2 mb-2 mb-sm-0" onClick={onHandleRejection}>
    <span role="img" aria-label="Cross">❌</span> Rechazar
  </button>
</div>

</Modal.Header>
      <Modal.Body>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredLista.map((element, index) => (
            <PrestamosCard
              key={index}
              status={element.status}
              image={element.box.element.image}
              cliente={element.box.element.image}
              component={element.box.element.name}
            />
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h5>Fecha De Devolucion: {dateOut}</h5>
        <button className="btn btn-secondary" onClick={onClose}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallePrestamo;
