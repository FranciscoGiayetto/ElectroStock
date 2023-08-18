import React, { useState, useEffect, useRef } from 'react';
import './Ecommerce.css';
import CardExample from '../../components/card/CardExample';
import WordList from '../../components/card/filtros';
import defaultpicture from '../../assets/images/defaultpicture.png';
import { useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Ecommerce() {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const loadMoreRef = useRef(null);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
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
  const handleButtonVisibility = () => {
    console.log('f', filteredCards.length, 'v', visibleCards.length)
    if (filteredCards.length === visibleCards.length && visibleCards.length != 0) {
      
      setShowLoadMoreButton(false);}

    else {
      setShowLoadMoreButton(true);
    }  
    }
  

  const getElement = async () => {
    const proxyUrl = 'http://127.0.0.1:8000';
    let response = await fetch(`${proxyUrl}/api/elementsEcommerce/`);
    let data = await response.json();

    // Reemplazar las imágenes nulas o vacías por la imagen por defecto
    const updatedData = data.map(card => ({
      ...card,
      image: card.image || defaultpicture,
    }));
    //console.log(updatedData);
    setCards(updatedData);
    setLoadMore(updatedData.length > 9);
   // console.log(updatedData.length > 9)
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
    <Container>
      <Row>
        <Col xs={2}>
        <WordList></WordList>
        </Col>
        <Col xs={10}>
        {visibleCards.map((card, index) => (
          <div key={index} >
            <CardExample title={card.name} text={card.description} image={card.image} id={card.id} />
          </div>
        ))}
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
  )
}

export default Ecommerce;


