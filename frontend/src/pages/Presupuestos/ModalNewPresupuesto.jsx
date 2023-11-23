import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ModalNewPresupuesto = ({ onClose, onHandleNewBudget, specialties }) => {
  const [title, setTitle] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleConfirm = () => {
    // Puedes realizar alguna lógica adicional aquí antes de confirmar
    onHandleNewBudget(title, selectedSpecialty);
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" contentClassName='custom-modal-content'>
      <Modal.Header className="d-flex justify-content-between align-items-center" closeButton>
        <div className="d-flex flex-column">
          <Modal.Title>Crear un Nuevo Presupuesto</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Título del Presupuesto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formSpecialty">
            <Form.Label>Especialidad</Form.Label>
            <Form.Control
              as="select"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">Seleccione una especialidad</option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="d-flex flex-column flex-sm-row align-items-sm-end">
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            <CheckRoundedIcon /> Confirmar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalNewPresupuesto;
