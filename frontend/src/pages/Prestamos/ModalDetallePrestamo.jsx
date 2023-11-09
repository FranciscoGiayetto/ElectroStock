import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import PrestamosCard from './CardPrestamos';

const ModalDetallePrestamo = ({ lista, onClose }) => {
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
      <Modal.Header closeButton>
        <div>
          <Modal.Title>Prestamos:</Modal.Title>
          <input
            type="text"
            placeholder="Buscar Componente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
          />
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
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallePrestamo;
