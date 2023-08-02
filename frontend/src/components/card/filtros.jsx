import React from 'react';

const WordList = () => {
  const words = ["Palabra1", "Palabra2", "Palabra3", "Palabra4", "Palabra5"];

  return (
    <div className="word-list">
      <h2>Categorias</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
