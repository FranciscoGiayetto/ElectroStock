// CardPrestamos.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderCard from '../../components/ordercard/OrderCard';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import useAxios from "../../utils/useAxios";
import { useAuthStore } from '../../store/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const PrestamosCardProfe = ({ status, image, cliente, dateIn, name }) => {
    const api = useAxios();
    const [orders, setOrders] = useState([]);
    const [isLoggedIn, user] = useAuthStore((state) => [
      state.isLoggedIn,
      state.user,
    ]);
    const userData = user();
    const navigate = useNavigate();

  useEffect(() => {
    console.log('SE EJECUTÓ EL USE');
    getOrders();
  }, []);

  
  const detallePrestamoURL = '/DetallePrestamo';
  const handleApproval = async () => {
    try {
      // Realiza una solicitud PUT para aprobar los registros del usuario en el servidor
      await api.put(`/aprobadoPost/${userData.user_id}/`);
      // Vuelve a cargar los préstamos actualizados después de la aprobación
      getOrders();
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleRejection = async () => {
    try {
      // Realiza una solicitud PUT para rechazar los registros del usuario en el servidor
      await api.put(`/desaprobadoPost/${userData.user_id}/`);
      // Vuelve a cargar los préstamos actualizados después del rechazo
      getOrders();
    } catch (error) {
      console.error(error);
    }
  };
  

  const getOrders = async () => {
    try {
      console.log(userData.user_id);
      const response = await api.get(`/p/${userData.user_id}`);
      let data = await response.data;
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='prestamo-card'>
      <div className='img-container'>
        <div className="container mt-5 mb-3">
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-3 mb-4 mb-lg-0">
                  <div className="bg-image rounded hover-zoom hover-overlay">
                    <img
                      src={image}
                      className="img-fluid w-100"
                      alt="Prestamo Image"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5>Prestamo de {cliente}</h5>
                  <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">
                      <i className="fas fa-star" />
                    </div>
                  </div>
                  <div className="mt-1 mb-0 text-muted">
                    <span><p>Estado: {status}</p></span>
                    <span className="text-primary"> • </span>
                    <span className="text-primary"> • </span>
                  </div>
                  <span>Fecha: {dateIn}</span>
                  <span className="text-primary"> • </span>
                  <span className="text-primary"> • </span>
                  <span>Componente: {name}</span>
                  <br />
                  <p className="text-truncate mb-4 mb-md-0">
                  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                  </p>
                </div>
                <div className="col-md-8 col-lg-3 border-start">
                  <h6 className="text-success"> •  • </h6>
                  <div className="d-flex flex-column mt-4">
                  </div>
                  <div className="d-flex flex-column ">
                  <button className="btn btn-success me-2" >
                <span role="img" aria-label="Checkmark">✅</span> Confirmar
              </button>
              <span>⠀⠀⠀⠀⠀⠀</span>
              <button className="btn btn-danger">
                <span role="img" aria-label="Cross">❌</span> Rechazar
              </button>                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestamosCardProfe;



