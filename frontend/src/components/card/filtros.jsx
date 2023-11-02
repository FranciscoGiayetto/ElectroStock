import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { useParams } from 'react-router-dom';


const WordList = () => {
  const api = useAxios();
  const { id } = useParams();
  const [parentCategories, setParentCategories] = useState([]);
  const [childrenCategories, setChildrenCategories] = useState([]);
  const [categoryVisibility, setCategoryVisibility] = useState({});

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

  const toggleCategoryVisibility = (categoryId) => {
    setCategoryVisibility({
      ...categoryVisibility,
      [categoryId]: !categoryVisibility[categoryId],
    });
  };

  const getElement = async () => {
    try {
      const response = await api.get(`/category/`);
      const data = response.data;

      // Filter out the categories you want to display
      const filteredParentCategories = data.filter(
        (category) =>
          category.category === null &&
          (category.name === 'equipos' ||
            category.name === 'componentes' ||
            category.name === 'insumos' ||
            category.name === 'kits arduino')
      );

      const formattedChildrenCategories = data.filter(
        (category) => category.category !== null
      );

      setParentCategories(filteredParentCategories);
      setChildrenCategories(formattedChildrenCategories);
      // Initialize the category visibility state
      const initialCategoryVisibility = {};
      filteredParentCategories.forEach((category) => {
        initialCategoryVisibility[category.id] = false;
      });
      setCategoryVisibility(initialCategoryVisibility);
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
      <ul>
        {parentCategories.map((item) => (
          <li key={item.id}>
            <div>
              <a
                href={`/tienda/${item.name}`}
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                {capitalizeFirstLetter(item.name)}
              </a>
              <button
                onClick={() => toggleCategoryVisibility(item.id)}
              >
                {categoryVisibility[item.id] ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {categoryVisibility[item.id] && (
              <ul>
                {childrenCategories
                  .filter((child) => child.category.id === item.id)
                  .map((child) => (
                    <li key={child.id}>
                      <a
                        href={`/tienda/${child.name}`}
                        style={{
                          fontSize: '0.9rem',
                          color: 'black',
                          textDecoration: 'none',
                        }}
                      >
                        {capitalizeFirstLetter(child.name)}
                      </a>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
