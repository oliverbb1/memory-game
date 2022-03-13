import React, { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/auto.jpg", matched: false },
  { src: "/img/avion.jpg", matched: false },
  { src: "/img/bicikl.jpg", matched: false },
  { src: "/img/helikopter.jpg", matched: false },
  { src: "/img/kamion.jpg", matched: false },
  { src: "/img/trotinet.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // mesanje karata

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiseOne(null);
    setChoiseTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        setCards((prevvCards) => {
          return prevvCards.map((card) => {
            if (card.src === choiseOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 900);
      }
    }
  }, [choiseOne, choiseTwo]);

  console.log(cards);

  //reset choises & increases turns

  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurns((prevTurnss) => prevTurnss + 1);
    setDisabled(false);
  };

  //start game automaticly
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Memory app</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
