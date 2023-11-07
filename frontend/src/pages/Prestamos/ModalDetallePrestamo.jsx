import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const listItemStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
  cursor: 'pointer',
};

const highlightedItemStyle = {
  ...listItemStyle,
  backgroundColor: '#f5f5f5', // Color de fondo cuando el mouse pasa por encima
};

const ModalDetallePrestamo = () => {



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
          {filteredElements.map((element) => (
            <li
              key={element.id}
              style={element === hoveredItem ? highlightedItemStyle : listItemStyle}
              onClick={() => {
                onItemSelect(element);
                onClose();
              }}
              onMouseEnter={() => setHoveredItem(element)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {element.name}
            </li>
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

export default ModalListItems;
