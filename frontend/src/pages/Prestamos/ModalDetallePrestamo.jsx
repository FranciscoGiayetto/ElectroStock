import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PrestamosCard from './CardPrestamos'; // Import the PrestamosCard component

const ModalDetallePrestamo = ({ lista, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <div>
          <Modal.Title>Prestamos:</Modal.Title>
          <input
            type="text"
            placeholder="Buscar Prestamo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {lista.map((element, index) => (
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
