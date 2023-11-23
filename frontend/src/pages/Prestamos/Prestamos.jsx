import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import useAxios from '../../utils/useAxios';
import './Prestamos.css';
import WordListPrestamos from './filtrosPrestamos';
import { useAuthStore } from '../../store/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PrestamosCardPackage from './PrestamosCardPackage';
import ModalDetallePrestamo from './ModalDetallePrestamo';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> </link>
</head>

const Prestamos = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const api = useAxios();
  const [data, setData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null); // State to store selected package
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const user_id = userData.user_id;
  const [showWordListPrestamos, setShowWordListPrestamos] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleApproval = async (dateIn) => {
    try {
      // Realiza una solicitud PUT para aprobar los registros del usuario en el servidor
      await api.put(`/aprobadoPost/${userData.user_id}/${dateIn}/`);
      // Vuelve a cargar los préstamos actualizados después de la aprobación
      getPrestamos();
      // Actualiza el estado del modal
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejection = async (dateIn) => {
    try {
      // Realiza una solicitud PUT para rechazar los registros del usuario en el servidor
      await api.put(`/desaprobadoPost/${userData.user_id}/${dateIn}/`);
      // Vuelve a cargar los préstamos actualizados después del rechazo
      getPrestamos();
      // Actualiza el estado del modal
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getPrestamos();
  }, []);

  const getPrestamos = async () => {
    try {
      const response = await api.get(`/prestamosHistorial/${user_id}`);
      console.log(response.data); // Verify the response from the API
      const data = response.data;
      setData(data);
      // Extract the dates from the response
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (packageData) => {
    console.log("Click registrado")
    setSelectedPackage(packageData);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPackage(null);
    setIsModalOpen(false);
  };
  return (
    <div className='container pagecontainer'>
      
      <div >
          {data.length > 0 ? (
            data.map((prestamo, index) => (
              <PrestamosCardPackage
                onClick={() => openModal(prestamo)}
                key={index}
                image={prestamo.imagen}
                status={prestamo.estado}
                name={prestamo.nombre}
                dateIn={prestamo.dateIn}
                dateOut={prestamo.dateOut}
                count={prestamo.count}
                lista={prestamo.lista}                  
              />
            ))): (
              <p>Cargando préstamos...</p>
              )}
      </div>

      {isModalOpen && (
        <ModalDetallePrestamo
        onHandleApproval={() => handleApproval(selectedPackage.dateIn)}
        onHandleRejection={() => handleRejection(selectedPackage.dateIn)}
        dateOut={selectedPackage.dateOut}
        lista={selectedPackage.lista}
        onClose={closeModal}
        />
      )}

    </div>
  );
};
  

export default Prestamos;