import React, { useState, useEffect } from 'react';
import './Ecommerce.css';
import CardExample from '../../components/card/CardExample';
import WordList from '../../components/card/filtros';
import defaultpicture from '../../assets/images/defaultpicture.png';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import useAxios from '../../utils/useAxios';
import { useParams } from 'react-router-dom';
import Pagination from '../../components/pagination/Paginacion'; // Import the Pagination component
import PropTypes from 'prop-types';

function Ecommerce({ allItems }) {
  const api = useAxios();
  const [count, setCount] = useState(1);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');
  const { name } = useParams();
  const [showWordList, setShowWordList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = 10; // Number of cards per page
  const [page, setPage] = useState(1);

  useEffect(() => {
    getElement();
    
  }, [page]);
  

  useEffect(() => {
    console.log('CAMBIO LA SEARCH QUERY', searchQuery);
    filterCards();
  }, [searchQuery]);

  const getElement = async () => {
    const endpoint = allItems
      ? `elementsEcommerce/?page=${page}`
      : `filtroCategoria/${encodeURIComponent(name)}/${page}`;

    try {
      const response = await api.get(`${endpoint}`);
      let data = await response.data;
      setCount(data.count);
      console.log(data);
      let results = data.results;
      // Replace null or empty images with the default image
      const updatedData = results.map((card) => ({
        ...card,
        image: card.image || defaultpicture,
      }));

      setCards(updatedData);
      setFilteredCards(updatedData);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setIsLoading(false);
    }
  };

  const filterCards = () => {
    let filteredCardsData = cards;

    if (searchQuery && searchQuery.trim() !== '') {
      filteredCardsData = cards.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCards(filteredCardsData);
  };

  const toggleWordList = () => {
    setShowWordList(!showWordList);
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleCards = filteredCards.slice(startIndex, endIndex);

  const toggleWordListVisibility = () => {
    setShowWordList(!showWordList);
  };

  return (
    <Container style={{ marginTop: '5rem' }}>
      <Row>
      <Col xs={12} md={2} className={`d-none d-md-block`}>
  {!isLoading && (
    <>
      <button onClick={toggleWordListVisibility}>
        {showWordList ? "Ocultar Categorías" : "Mostrar Categorías"}
      </button>
      {showWordList && <WordList />}
    </>
  )}
</Col>

        <Col xs={12} md={10}>
  
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : visibleCards.length === 0 ? (
            <div className="text-center">
              <h2>No hay productos disponibles para esta categoría.</h2>
              <a href="/tienda" className="btn btn-primary">
                Volver a la tienda
              </a>
            </div>
          ) : (
            filteredCards.map((card, index) => (
              <div key={index}>
                <CardExample
                  title={card.name}
                  text={card.description}
                  image={card.image}
                  id={card.id}
                  current_stock={card.current_stock}
                />
              </div>
            ))
          )}
        </Col>
      </Row>
      <Row>
  <Col xs={12} className="text-center">
    <div className="pagination-container">
      <Pagination
        totalRecords={count}
        pageLimit={pageSize}
        pageNeighbours={1}
        currentPage={page}
        onPageChanged={setPage}
      />
    </div>
  </Col>
</Row>

    </Container>
  );
}

Ecommerce.propTypes = {
  allItems: PropTypes.bool,
};

export default Ecommerce;

