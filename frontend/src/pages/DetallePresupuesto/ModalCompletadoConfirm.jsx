import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ModalCompletadoConfirm = ({ onClose, onHandleCompletadoConfirm }) => {
  const [title, setTitle] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

 

  return (
    <Modal
      show={true}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
     <Modal.Header closeButton>
          <Modal.Title>Presupuesto Completado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estas seguro que ya se compraron todos los items y estan listos para guardarse en la base de datos?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{backgroundColor:'#FF5151', border:'none'}} onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" style={{backgroundColor:'#3BB273', border:'none'}} onClick={onHandleCompletadoConfirm}>
            Continuar
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default ModalCompletadoConfirm;
