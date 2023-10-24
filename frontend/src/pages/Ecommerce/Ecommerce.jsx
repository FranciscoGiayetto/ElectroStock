import React, { useState, useEffect, useRef } from 'react';
import './Ecommerce.css';
import CardExample from '../../components/card/CardExample';
import WordList from '../../components/card/filtros';
import defaultpicture from '../../assets/images/defaultpicture.png';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useAxios from '../../utils/useAxios';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
function Ecommerce({ allItems }) {
  console.log(allItems)
  const api = useAxios()
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const loadMoreRef = useRef(null);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const { name } = useParams();
  useEffect(() => {
    getElement();
  }, []);

  useEffect(() => {
    console.log('CAMBIO LA SEARCH QUERY', searchQuery)
    filterCards();
  }, [searchQuery, loadMore]);

  useEffect(() => {
    handleButtonVisibility();
  }, [visibleCards]);

  const handleLoadMore = () => {
    const nextCards = filteredCards.slice(visibleCards.length, visibleCards.length + 9);
    setVisibleCards(prevVisibleCards => [...prevVisibleCards, ...nextCards]);
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

    const response = await api.get(`${endpoint}`);
    let data = await response.data;
    console.log(data)

    // Reemplazar las imágenes nulas o vacías por la imagen por defecto
    const updatedData = data.map(card => ({
      ...card,
      image: card.image || defaultpicture,
    }));

    setCards(updatedData);
    setLoadMore(updatedData.length > 9);
  };

  const filterCards = () => {
    if (!searchQuery || searchQuery.trim() === '') {
      setFilteredCards(cards);
      setVisibleCards(cards.slice(0, 9));
      setLoadMore(cards.length > 9);
    } else {
      const filteredCardsData = cards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filteredCardsData);
      setVisibleCards(filteredCardsData.slice(0, 9));
      setLoadMore(filteredCardsData.length > 9);
    }
  };

  return (
    <Container style={{ marginTop: '5rem' }}>
      <Row>
        <Col xs={2}>
          <WordList />
        </Col>
        <Col xs={10}>
          {visibleCards.length === 0 ? (
            <div className="text-center"> {/* Center the content */}
              <h2>No hay productos disponibles para esta categoría.</h2>
              <a href="/tienda" className="btn btn-primary">
                Volver a la tienda
              </a>
            </div>
          ) : (
            visibleCards.map((card, index) => (
              <div key={index}>
    <CardExample
  id={card.id}
  title={card.title}
  image={card.image}
  current_stock={card.current_stock}
  element={element} // Pasa element como propiedad
  userData={userData} // Pasa userData como propiedad
  api={api} // Pasa api como propiedad
  setPostRes={setPostRes} // Pasa setPostRes como propiedad
/>

              </div>
            ))
          )}
        </Col>
      </Row>
      {showLoadMoreButton && (
        <div className='row'>
          <div className='col-12 text-center'>
            <button className='btn btn-primary cargarMas' onClick={handleLoadMore}>
              Cargar más
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Ecommerce;
