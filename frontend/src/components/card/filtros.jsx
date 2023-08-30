import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { useParams } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';

const WordList = () => {
  const api = useAxios();
  const { id } = useParams();
  const [parentCategories, setParentCategories] = useState([]);
  const [childrenCategories, setChildrenCategories] = useState([]);

  useEffect(() => {
    getElement();
  }, []);

  const handleFilter = (categoryId) => {
    console.log('funcionan los links!!', categoryId);
    // Implement your logic to handle filtering based on the selected category
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getElement = async () => {
    try {
      const response = await api.get(`/category/`);
      const data = response.data;
      const formattedParentCategories = data.filter((category) => category.category === null);
      const formattedChildrenCategories = data.filter((category) => category.category !== null);

      setParentCategories(formattedParentCategories);
      setChildrenCategories(formattedChildrenCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryNameById = (categoryId) => {
    const category = parentCategories.find((item) => item.id === categoryId);
    return category ? category.name : '';
  };

  return (
    <div className="word-list">
      <h2>Categorias Padre</h2>
      <ul>
        {parentCategories.map((item) => (
          <ListGroup key={item.id}>
            <div>
            {item.name}
             
            </div>
            {/* Render children categories as a dropdown */}
            <select onChange={(e) => handleFilter(parseInt(e.target.value))}>
              <option value="">Seleccione una categoría hija</option>
              {childrenCategories
                .filter((child) => child.category.id === item.id)
                .map((child) => (
                  <option key={child.id} value={child.id}>
                    {item.name} - {child.name}
                  </option>
                ))}
            </select>

          </ListGroup> 
        
        ))}
      </ul>
    </div>
  );
};

export default WordList;
