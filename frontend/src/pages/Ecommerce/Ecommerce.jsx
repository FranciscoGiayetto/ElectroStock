import React, { useState, useEffect, useRef } from 'react';
import './Ecommerce.css';
import CardExample from '../../components/card/CardExample';
import WordList from '../../components/card/filtros';
import defaultpicture from '../../assets/images/defaultpicture.png';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'; // Importa el Spinner
import useAxios from '../../utils/useAxios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function Ecommerce({ allItems }) {
  const api = useAxios();
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const loadMoreRef = useRef(null);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const { name } = useParams();
  const [showWordList, setShowWordList] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga

  useEffect(() => {
    getElement();
  }, []);

  useEffect(() => {
    console.log('CAMBIO LA SEARCH QUERY', searchQuery);
    filterCards();
  }, [searchQuery, loadMore]);

  useEffect(() => {
    handleButtonVisibility();
  }, [visibleCards]);

  const handleLoadMore = () => {
    const nextCards = filteredCards.slice(
      visibleCards.length,
      visibleCards.length + 9
    );
    setVisibleCards((prevVisibleCards) => [...prevVisibleCards, ...nextCards]);
  };

  const handleButtonVisibility = () =>  {
    if (filteredCards.length === visibleCards.length && visibleCards.length !== 0) {
      setShowLoadMoreButton(false);
    } else {
      setShowLoadMoreButton(true);
    }
  };

  const getElement = async () => {
    const endpoint = allItems ? 'elementsEcommerce/' : `filtroCategoria/${encodeURIComponent(name)}/`;

    try {
      const response = await api.get(`${endpoint}`);
      let data = await response.data;
      console.log(data);

      // Replace null or empty images with the default image
      const updatedData = data.map((card) => ({
        ...card,
        image: card.image || defaultpicture,
      }));

      setCards(updatedData);
      setLoadMore(updatedData.length > 9);
      setIsLoading(false); // Indica que la carga ha terminado
    } catch (error) {
      // Manejar errores aquí
      console.error('Error al obtener datos:', error);
      setIsLoading(false); // Asegúrate de desactivar la carga en caso de error
    }
  };

  const filterCards = () => {
    if (!searchQuery || searchQuery.trim() === '') {
      setFilteredCards(cards);
      setVisibleCards(cards.slice(0, 9));
      setLoadMore(cards.length > 9);
    } else {
      const filteredCardsData = cards.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filteredCardsData);
      setVisibleCards(filteredCardsData.slice(0, 9));
      setLoadMore(filteredCardsData.length > 9);
    }
  };

  // Toggle the visibility of WordList
  const toggleWordList = () => {
    setShowWordList(!showWordList);
  };

  return (
    <Container style={{ marginTop: '5rem' }}>
      <Row>
        {/* Show WordList on md and larger screens */}
        <Col xs={12} md={2} className={`d-none d-md-block`}>
        {!showWordList && !isLoading && (
  <WordList />
        )}
        </Col>

        <Col xs={12} md={10}>
          {/* Toggle WordList visibility on smaller screens */}
          {showWordList &&(
            <div>
              <WordList />
            </div>
          )}
          {isLoading ? ( // Muestra el Spinner mientras se carga
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            visibleCards.length === 0 ? (
              <div className="text-center">
                <h2>No hay productos disponibles para esta categoría.</h2>
                <a href="/tienda" className="btn btn-primary">
                  Volver a la tienda
                </a>
              </div>
            ) : (
              visibleCards.map((card, index) => (
                <div key={index}>
                  <CardExample title={card.name} text={card.description} image={card.image} id={card.id} current_stock={card.current_stock} />
                </div>
              ))
            )
          )}
        </Col>
      </Row>
      {showLoadMoreButton && !isLoading && (
  <div className="row">
    <div className="col-12 text-center">
      <button className="btn btn-primary cargarMas" onClick={handleLoadMore}>
        Cargar más
      </button>
    </div>
  </div>
)}
    </Container>
  );
}

export default Ecommerce;
