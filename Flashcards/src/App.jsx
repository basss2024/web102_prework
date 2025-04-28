import React, { useState, useEffect } from "react";
import "./app.css";

import thorfinnGif from "./assets/thorfinn.gif";
import thorsGif from "./assets/thors.gif";
import askeladdGif from "./assets/askeladd.gif";
import canuteGif from "./assets/canute.gif";
import vinlandGif from "./assets/vinland.gif";
import flokiGif from "./assets/floki.jpeg";
import snakeGif from "./assets/snake.gif";
import bjornGif from "./assets/bjorn.gif";
import backgroundGif from "./assets/opening.gif";
import backgroundMusic from "./assets/audio.mp3";

const cards = [
  { question: "Who is the main protagonist of Vinland Saga?", answer: "Thorfinn", image: thorfinnGif },
  { question: "What is the name of Thorfinn's father?", answer: "Thors", image: thorsGif },
  { question: "Which Viking leader does Thorfinn serve under?", answer: "Askeladd", image: askeladdGif },
  { question: "Who is the prince that Thorfinn encounters?", answer: "Canute", image: canuteGif },
  { question: "What is the ultimate goal Thorfinn seeks?", answer: "Vinland", image: vinlandGif },
  { question: "Who is the commander of the Jomsvikings?", answer: "Floki", image: flokiGif },
  { question: "Who is Thorfinn's rival in the second season?", answer: "Snake", image: snakeGif },
  { question: "What is the name of Askeladd best friend?", answer: "Bjorn", image: bjornGif }
];

const FlashCard = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard" onClick={() => setFlipped(!flipped)}>
      {flipped ? (
        <>
          <h2>{card.answer}</h2>
          <img src={card.image} alt={card.answer} className="card-image" />
        </>
      ) : (
        <h2>{card.question}</h2>
      )}
    </div>
  );
};

const CardContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentIndex(randomIndex);
  };

  return (
    <div className="card-container">
      <h1>Vineland Saga Quiz</h1>
      <h3>Created by Shamiah Bass - Z#: Z23526337</h3>
      <div className="card-wrapper">
        <FlashCard card={cards[currentIndex]} />
      </div>
      <button onClick={nextCard} className="next-button">Next</button>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundGif})` }}>
      <CardContainer />
    </div>
  );
};

export default App;
