import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import useAxios from '../../utils/useAxios';
import './Prestamos.css';
import { useAuthStore } from '../../store/auth';
import PrestamosCardPackage from './PrestamosCardPackage';
import ModalDetallePrestamo from './ModalDetallePrestamo';
const Prestamos = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const api = useAxios();
  const [data, setData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null); // State to store selected package
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const user_id = userData.user_id;
  
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
    <div className="container pagecontainer">
      <h1 className="textito">Mis prestamos</h1>

   
      
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
      
      {isModalOpen && (
        <ModalDetallePrestamo lista={selectedPackage.lista} onClose={closeModal} />
      )}
    </div>
    );
  };
  

export default Prestamos;
