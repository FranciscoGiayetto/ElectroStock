import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import useAxios from '../../utils/useAxios';
import { useAuthStore } from '../../store/auth';

const Prestamos = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const api = useAxios();
  const [prestamos, setPrestamos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState(''); // Estado actual del filtro
  const user_id = userData.user_id;

  useEffect(() => {
    getPrestamos();
  }, [filtroEstado]); // Actualiza la lista cuando cambia el filtro de estado

  const getPrestamos = async () => {
    try {
      // Incluye el filtro de estado en la solicitud
      const response = await api.get(`/prestamosHistorial/${user_id}/?estado=${filtroEstado}`);
      console.log(response.data);
      const data = response.data;
      setPrestamos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar cambios en el filtro de estado
  const handleFiltroEstadoChange = (event) => {
    const selectedEstado = event.target.value;
    setFiltroEstado(selectedEstado);
  };

  return (
    <div className="container pagecontainer">
      <h1 className="textito">Mis préstamos</h1>

      <div className="filtro-container">
        <label htmlFor="filtroEstado">Filtrar por Estado:</label>
        <select
          id="filtroEstado"
          value={filtroEstado}
          onChange={handleFiltroEstadoChange}
        >
          <option value="">Todos</option>
          <option value="Aprobado">Aprobado</option>
          <option value="Desaprobado">Desaprobado</option>
          {/* Agrega más opciones de estado aquí */}
        </select>
      </div>

      <div className="prestamos-list">
        {prestamos.length > 0 ? (
          prestamos.map((prestamo, index) => (
            <PrestamosCard
              key={index}
              image={prestamo.box.element.image}
              status={prestamo.status}
              cliente={prestamo.borrower.username}
              dateIn={prestamo.dateIn}
              componente={prestamo.box.element.name}
            />
          ))
        ) : (
          <p>Cargando préstamos...</p>
        )}
      </div>
    </div>
  );
};

export default Prestamos;