import React, { useState, useEffect, useRef } from 'react';
import './Ecommerce.css';
import CardExample from '../../components/card/CardExample';

function Ecommerce() {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const loadMoreRef = useRef(null);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    getElement();
  }, []);

  useEffect(() => {
    setVisibleCards(cards.slice(0, 9));
  }, [cards]);

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
    setCards(data);

    if (data.length > 9) {
      setLoadMore(true);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        {visibleCards.map((card, index) => (
          <div key={index} className='col-4'>
            <CardExample title={card.name} text={card.description} image={card.image} />
          </div>
        ))}
      </div>

      {loadMore && (
        <div className='row'>
          <div className='col-12 text-center'>
            <button className='btn btn-primary' onClick={handleLoadMore}>
              Cargar más
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ecommerce;
