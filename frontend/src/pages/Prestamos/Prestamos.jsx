import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import useAxios from '../../utils/useAxios';
import './Prestamos.css';
import { useAuthStore } from '../../store/auth';
import PrestamosCardPackage from './PrestamosCardPackage';
import ModalDetallePrestamo from './ModalDetallePrestamo';
const Prestamos = ({ isProfessor }) => {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const api = useAxios();
  const [data, setData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null); // State to store selected package
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const user_id = userData.user_id;

  const handleApproval = async (dateIn, packageUserId) => {
    try {
      // Realiza una solicitud PUT para aprobar los registros del usuario en el servidor
      await api.put(`/aprobadoPost/${packageUserId}/${dateIn}/`);
      // Vuelve a cargar los préstamos actualizados después de la aprobación
      getPrestamos();
      // Actualiza el estado del modal
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const HandleDevolution = async (dateIn, packageUserId) => {
    try {
      // Realiza una solicitud PUT para aprobar los registros del usuario en el servidor
      await api.put(`/devueltoPost/${packageUserId}/${dateIn}/`);
      // Vuelve a cargar los préstamos actualizados después de la aprobación
      getPrestamos();
      // Actualiza el estado del modal
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  const handleRejection = async (dateIn,packageUserId) => {
    try {
      // Realiza una solicitud PUT para rechazar los registros del usuario en el servidor
      await api.put(`/desaprobadoPost/${packageUserId}/${dateIn}/`);
      // Vuelve a cargar los préstamos actualizados después del rechazo
      getPrestamos();
      // Actualiza el estado del modal
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (isProfessor !== null) {
      getPrestamos();
    }
  }, [isProfessor]);
  

  const getPrestamos = async () => {
    try {
      let endpoint;
      console.log(isProfessor)
    if (isProfessor) {
      endpoint = '/allPrestamos';
      console.log("isProfessor") // Endpoint for professors
    } else {
      console.log("isnotProfessor") // Endpoint for professors

      endpoint = `/prestamosHistorial/${user_id}`; // Endpoint for regular users
    }
      const response = await api.get(endpoint);
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
    <div className="container pagecontainer">
   <div className="title-container" >
    <h1 className="textito">Mis prestamos</h1>
  </div>

   
           
  <div>
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
                user_id={prestamo.id_user}
              />
             
             
        ))): (
          
          <p>Cargando préstamos...</p>
          )}
       </div>
      {isModalOpen && (
  <ModalDetallePrestamo
    onHandleApproval={() => handleApproval(selectedPackage.dateIn, selectedPackage.id_user)}
    onHandleRejection={() => handleRejection(selectedPackage.dateIn, selectedPackage.id_user)}
    onHandleDevolution={() => HandleDevolution(selectedPackage.dateIn, selectedPackage.id_user)}
    dateOut={selectedPackage.dateOut}
    lista={selectedPackage.lista}
    status={selectedPackage.estado}
    isProfessor={isProfessor}
    onClose={closeModal}
  />
)}
    </div>
    );
  };
  

export default Prestamos;
