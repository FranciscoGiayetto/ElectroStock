import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import useAxios from '../../utils/useAxios';
import './Prestamos.css';
import FiltrosPrestamos from './filtrosPrestamos';
import OrdenarPorPrestamos from './OrdenarPor';
import { useAuthStore } from '../../store/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PrestamosCardPackage from './PrestamosCardPackage';
import ModalDetallePrestamo from './ModalDetallePrestamo';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Spinner from 'react-bootstrap/Spinner';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { TextField } from "@mui/material";  
import Button from 'react-bootstrap/Button';
import InputAdornment from '@mui/material/InputAdornment';




<head>
  <link rel="preconnect" href="https://fonts.googleapis.com"></link>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> </link>
</head>

const Prestamos = ({ isProfessor }) => {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const api = useAxios();
  const [data, setData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null); // State to store selected package
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const user_id = userData.user_id;
  const [showWordListPrestamos, setShowWordListPrestamos] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleApproval = async (dateIn, packageUserId) => {
    try {
      // Realiza una solicitud PUT para aprobar los registros del usuario en el servidor
      await api.put(`/aprobadoPost/${packageUserId}/${dateIn}/`);
      // Vuelve a cargar los préstamos actualizados después de la aprobación
      getPrestamos();
      // Actualiza el estado del modal
      closeModal();
      setIsLoading(false);

    } catch (error) {
      console.error(error);
      setIsLoading(false);

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
      setIsLoading(false);

    } catch (error) {
      console.error(error);
      setIsLoading(false);

    }
  };

  const HandleDestruction = async (selectedPackage, selectedCards, quantityInputs) => {
    console.log (selectedPackage,selectedCards,quantityInputs)
    
    try {
      // Iterate over selected cards to create logs for each item
      for (const selectedIndex of selectedCards) {
        const element = selectedPackage.lista[selectedIndex];
        const quantityDestroyed = quantityInputs[selectedIndex] || 0;
        const fechaDevuelto = new Date().toISOString().split('T')[0]; // Obtener la parte de la fecha (YYYY-MM-DD)
        const fechaDevueltoHora = new Date().toISOString().slice(0, 16).replace('T', ' '); // Formato 'YYYY-MM-DD HH:mm'

        // Create a log for the destroyed item
        const logData = {
          box_id: element.box.id, // Replace with the actual property in your data
          borrower_id: element.borrower.id, // Replace with the actual property in your data
          lender_id: element.lender.id, // Replace with the actual property in your data
          status: 'ROT', // Replace with the appropriate status for destruction
          quantity: quantityDestroyed,
          observation: `Item Averiado enla fecha ${fechaDevueltoHora}`,
          dateIn:selectedPackage.dateIn,
          dateOut: fechaDevuelto, // Update as needed
        };
  
        // Make a POST request to create the log
        await api.post('/log/', logData);
  
        // You may need to update the status or perform other actions based on the API response
  
        // Log created successfully, you can handle additional logic here
      }
  
      // Optionally, you can update the state or perform other actions after all logs are created
      // ...
      try{
        console.log("Ahora devolviendo todo")
      HandleDevolution(selectedPackage.dateIn, selectedPackage.id_user)
      
    }
  
    catch (error) {
      console.error(error);
      setIsLoading(false);
  
      // Handle errors or display error messages
      // ...
    }
      
      // Close the modal and update the state
      closeModal();
      setIsLoading(false);
  
    } catch (error) {
      console.error(error);
      setIsLoading(false);
  
      // Handle errors or display error messages
      // ...
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
      setIsLoading(false);

    } catch (error) {
      console.error(error);
      setIsLoading(false);

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
      console.log("DATAAA",response.data); // Verify the response from the API
      if (response.data === "No se encontraron logs para este usuario.") {
        // Manejar el caso cuando no hay logs
        setData([]);
      } else {
        const data = response.data;
        setData(data);
      }
  
      setIsLoading(false);
  
      // Extrae las fechas de la respuesta
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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

   <div className="tratandodecentrar">
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      )}
      <Container>
        <Col>
          {/* Search Bar */}
          <Row className=" col-md-12" >
          <Col md="auto">
  <div className="mr-12 mt-4">
    <OrdenarPorPrestamos />
  </div>
</Col>

<Col>
  <div className="d-flex align-items-center mt-4">
    <TextField
      fullWidth
      id="SearchVisit"
      variant="outlined"
      label="Buscar"
      className="SearchVisit"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button variant="outline-secondary">
              <SearchRoundedIcon />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  </div>
</Col>
      
          </Row>
         {/* Prestamos Cards */}
         <Row className="mt-4">
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
                ))
              ) : (
                <p className='d-flex justify-content-center'>No hay préstamos disponibles.</p>
              )}
            </div>
          </Row>



          <Row>
      {isModalOpen && (
        <ModalDetallePrestamo
        onHandleApproval={() => handleApproval(selectedPackage.dateIn , selectedPackage.id_user)}
        onHandleRejection={() => handleRejection(selectedPackage.dateIn, selectedPackage.id_user)}
        onHandleDevolution={() => HandleDevolution(selectedPackage.dateIn, selectedPackage.id_user)}
        onHandleDestruction={(selectedCards,quantityInputs) => HandleDestruction(selectedPackage,selectedCards,quantityInputs )}
        dateOut={selectedPackage.dateOut}
        lista={selectedPackage.lista}
        onClose={closeModal}
        isProfessor={isProfessor}
        status={selectedPackage.estado}
        />
        )}
        </Row>
      </Col>
    </Container>
    </div>
  );

};
  

export default Prestamos;