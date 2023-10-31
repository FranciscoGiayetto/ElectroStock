import React, { useState, useEffect } from 'react';
import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from 'mdb-react-ui-kit';
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
    <MDBModal staticBackdrop isOpen={isOpen} fullHeight position="right">
      <MDBModalHeader>Nuevo Presupuesto</MDBModalHeader>
      <MDBModalBody>
        <form>
          <div className="mb-3">
            <label htmlFor="budgetName" className="form-label">
              Nombre del Presupuesto:
            </label>
            <input
              type="text"
              className="form-control"
              id="budgetName"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
            />
          </div>
          {specialities && specialities.length > 0 && (
            <div className="mb-3">
              <label htmlFor="speciality" className="form-label">
                Especialidad:
              </label>
              <select
                className="form-select"
                id="speciality"
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
              >
                {specialities.map((speciality) => (
                  <option key={speciality.id} value={speciality.id}>
                    {speciality.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={onClose}>
          Cancelar
        </MDBBtn>
        <MDBBtn color="primary" onClick={handleFormSubmit}>
          Crear
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default ModalNewBudget;
