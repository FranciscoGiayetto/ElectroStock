import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { useParams } from 'react-router-dom';

const WordList = () => {
  const api = useAxios();
  const { id } = useParams();
  const [element, setElement] = useState([]);
  
  useEffect(() => {
    getElement();
  }, []);

  const getElement = async () => {
    try {
      const response = await api.get(`/category/`);
      const data = response.data;
      setElement(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="word-list">
      <h2>Categorias</h2>
      <ul>
        {element.map((item, i) => (
          <li key={i}>{item.name}</li>
    
        ))}
      </ul>
    </div>
  );
};

export default WordList;
