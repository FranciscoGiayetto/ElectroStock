import React, { useState, useEffect, useRef } from 'react';
import './Ecommerce.css';
import CardExample from '../../components/card/CardExample';

function Ecommerce() {
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    getElement();
  }, []);

  useEffect(() => {
    setVisibleCards(cards.slice(0, 9));
  }, [cards]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [cards]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && visibleCards.length < cards.length) {
      const nextCards = cards.slice(visibleCards.length, visibleCards.length + 3);
      setVisibleCards(prevVisibleCards => [...prevVisibleCards, ...nextCards]);
    }
  };

  const getElement = async () => {
    const proxyUrl = 'http://127.0.0.1:8000';
    let response = await fetch(`${proxyUrl}/api/elementsEcommerce/`);
    let data = await response.json();
    setCards(data);
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

      {visibleCards.length < cards.length && <div ref={loadMoreRef}></div>}
    </div>
  );
}

export default Ecommerce;
