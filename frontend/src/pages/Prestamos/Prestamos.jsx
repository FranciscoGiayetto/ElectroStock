// En Prestamos.js
import React, { useState, useEffect } from 'react';
import PrestamosCard from './CardPrestamos';
import useAxios from '../../utils/useAxios';
import { useAuthStore } from '../../store/auth';
import WordList from './WordList.jsx'; // Asegúrate de importar WordList desde la ubicación correcta

const Prestamos = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const userData = user();
  const api = useAxios();
  const [prestamos, setPrestamos] = useState([]);
  const user_id = userData.user_id;
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getPrestamos();
  }, []);

  useEffect(() => {
    // Aquí puedes aplicar el filtro a los préstamos si se selecciona una categoría.
    if (selectedCategory !== null) {
      // Filtra los préstamos en base a la categoría seleccionada.
      const filteredPrestamos = prestamos.filter((prestamo) => prestamo.categoria === selectedCategory);
      setPrestamos(filteredPrestamos);
    } else {
      // Vuelve a cargar todos los préstamos si no hay una categoría seleccionada.
      getPrestamos();
    }
  }, [selectedCategory]);

  const getPrestamos = async () => {
    try {
      const response = await api.get(`/prestamosHistorial/${user_id}/`);
      console.log(response.data);
      const data = response.data;
      setPrestamos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container pagecontainer">
      <h1 className="textito">Mis préstamos</h1>
      <div className="prestamos-filter">
        <WordList onCategorySelect={handleCategorySelect} />
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
