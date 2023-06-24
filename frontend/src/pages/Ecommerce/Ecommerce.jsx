import React, { useState, useEffect, useRef } from 'react';
import './Ecommerce.css';
import CardExample from '../../components/card/CardExample';
import defaultpicture from '../../assets/images/defaultpicture.png';
import { useSearchParams } from 'react-router-dom';

function Ecommerce() {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const loadMoreRef = useRef(null);
  const [loadMore, setLoadMore] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');

  useEffect(() => {
    getElement();
  }, []);

  useEffect(() => {
    filterCards();
  }, [searchQuery, loadMore]);

  const handleLoadMore = () => {
    const nextCards = cards.slice(visibleCards.length, visibleCards.length + 9);
    setVisibleCards(prevVisibleCards => [...prevVisibleCards, ...nextCards]);

    if (visibleCards.length + 9 >= cards.length) {
      setLoadMore(false);
    }
  };

  const getElement = async () => {
    const proxyUrl = 'http://127.0.0.1:8000';
    let response = await fetch(`${proxyUrl}/api/elementsEcommerce/`);
    let data = await response.json();

    // Reemplazar las imágenes nulas o vacías por la imagen por defecto
    const updatedData = data.map(card => ({
      ...card,
      image: card.image || defaultpicture,
    }));
    console.log(updatedData);
    setCards(updatedData);
    setLoadMore(updatedData.length > 9);
   // console.log(updatedData.length > 9)
  };

  const filterCards = () => {
    if (!searchQuery || searchQuery.trim() === '') {
      setVisibleCards(cards.slice(0, 9));
      setLoadMore(cards.length > 9);
    } else {
      const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(visibleCards)
      setVisibleCards(filteredCards.slice(0, 9));
      setLoadMore(filteredCards.length > 9);
    }
  };
  
  

  return (
    <div className='container' id='ecommerce'>
      <div className='row'>
        {visibleCards.map((card, index) => (
          <div key={index} className='col-10 col-sm-7 col-md-6 col-lg-4 mb-2'>
            <CardExample title={card.name} text={card.description} image={card.image} id={card.id} />
          </div>
        ))}
      </div>

      {loadMore && (
        <div className='row'>
          <div className='col-12 text-center'>
            <button className='btn btn-primary cargarMas' onClick={handleLoadMore}>
              Cargar más
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ecommerce;
