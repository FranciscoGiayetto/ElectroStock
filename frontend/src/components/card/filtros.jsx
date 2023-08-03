import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const WordList = () => {
  const api = useAxios();
  const { id } = useParams();
  const [element, setElement] = useState([]);
  
  useEffect(() => {
    getElement();
  }, []);

  const handleFilter = () => {
    console.log('funcionan los links!!')    
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getElement = async () => {
    try {
      const response = await api.get(`/category/`);
      const data = response.data.map(category => ({
        ...category,
        name: capitalizeFirstLetter(category.name)
      }));
      setElement(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="word-list" >
      <h2>Categorias</h2>
      <ul>
        {element.map((item, i) => (
          <li key={i}><Link onClick={handleFilter}>{item.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
