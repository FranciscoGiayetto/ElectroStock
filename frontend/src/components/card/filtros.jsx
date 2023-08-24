import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { useParams } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';

const WordList = () => {
  const api = useAxios();
  const { id } = useParams();
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    getElement();
  }, []);

  const getElement = async () => {
    try {
      const response = await api.get(`/category/`);
      const data = response.data;
      const formattedParentCategories = data.filter((category) => category.category === null);

      setParentCategories(formattedParentCategories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="word-list">
      <h2>Categorias</h2>
      <ul>
        {parentCategories.map((item) => (
          <ListGroup key={item.id}>
            <div>
              <a href={`/tienda/${item.name}`} className="btn btn-primary">
                {item.name}
              </a>
            </div>
          </ListGroup> 
        ))}
      </ul>
    </div>
  );
};

export default WordList;
