import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

const ModalNewBudget = ({ isOpen, onClose, onSubmit, specialities }) => {
  const [budgetName, setBudgetName] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');

  useEffect(() => {
    // Establecer la especialidad predeterminada si hay especialidades disponibles
    if (specialities && specialities.length > 0) {
      setSelectedSpeciality(specialities[0].id);
    }
  }, [specialities]);

  const handleFormSubmit = () => {
    const newBudgetData = {
      name: budgetName,
      status: 'PROGRESO',
      speciality: selectedSpeciality,
    };
    onSubmit(newBudgetData);
  };

  return (
    <Modal show={isOpen} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Presupuesto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Presupuesto:</Form.Label>
            <Form.Control
              type="text"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
            />
          </Form.Group>
          {specialities && specialities.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>Especialidad:</Form.Label>
              <Form.Select
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
              >
                {specialities.map((speciality) => (
                  <option key={speciality.id} value={speciality.id}>
                    {speciality.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Crear
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalNewBudget;
