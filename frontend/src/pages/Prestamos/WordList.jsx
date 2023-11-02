// En WordList.js
import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';


const WordList = ({ onCategorySelect }) => {
    const [user] = useAuthStore((state) => [state.user]);
  const api = useAxios();
  const { id } = useParams();
  const userData = user();
  const user_id = userData.user_id;
  const [parentCategories, setParentCategories] = useState([]);
  const [childrenCategories, setChildrenCategories] = useState([]);

  useEffect(() => {
    getElement();
  }, []);

  const getElement = async () => {
    try {
      const response = await api.get(`/logFiltros/PED/${user_id}`);
      const data = response.data;

      // Filter out the categories you want to display
      const filteredParentCategories = data.filter(
        (status) => status.status === null && (status.name === 'equipos' || status.name === 'componentes' || status.name === 'insumos' || status.name === 'kits arduino')
      );

      const formattedChildrenCategories = data.filter((status) => status.status !== null);

      setParentCategories(filteredParentCategories);
      setChildrenCategories(formattedChildrenCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="word-list">
      <ul>
        {parentCategories.map((item) => (
          <li key={item.id}>
            <div>
              <a
                href="#"
                onClick={() => handleCategoryClick(item.id)}
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: 'black',
                  textDecoration: 'none'
                }}
              >
                {capitalizeFirstLetter(item.name)}
              </a>
            </div>
            <ul>
              {childrenCategories
                .filter((child) => child.category.id === item.id)
                .map((child) => (
                  <li key={child.id}>
                    <a
                      href="#"
                      onClick={() => handleCategoryClick(child.id)}
                      style={{
                        fontSize: '0.9rem',
                        color: 'black',
                        textDecoration: 'none'
                      }}
                    >
                      {capitalizeFirstLetter(child.name)}
                    </a>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
