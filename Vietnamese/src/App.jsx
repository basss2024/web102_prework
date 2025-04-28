import React, { useState } from "react";
import backgroundLogo from "./assets/viet.jpg";
import "./App.css";

const flashcards = [
  { english: "Hello", vietnamese: "Xin chào" },
  { english: "Thank you", vietnamese: "Cảm ơn" },
  { english: "Goodbye", vietnamese: "Tạm biệt" },
  { english: "Yes", vietnamese: "Vâng" },
  { english: "No", vietnamese: "Không" },
  { english: "Please", vietnamese: "Làm ơn" },
  { english: "Sorry", vietnamese: "Xin lỗi" },
  { english: "Water", vietnamese: "Nước" },
  { english: "Food", vietnamese: "Thức ăn" },
  { english: "Friend", vietnamese: "Bạn bè" }
];

const normalizeText = (text) => {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
};

const FlashcardGame = () => {
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [flipped, setFlipped] = useState(false);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [mastered, setMastered] = useState([]);
  const [cards, setCards] = useState(flashcards);

  const checkAnswer = () => {
    const normalizedUserAnswer = normalizeText(userAnswer);
    const normalizedCorrectAnswer = normalizeText(cards[index].vietnamese);
    
    if (normalizedUserAnswer.includes(normalizedCorrectAnswer)) {
      setFeedback("✅ Correct!");
      setStreak(streak + 1);
      if (streak + 1 > longestStreak) {
        setLongestStreak(streak + 1);
      }
    } else {
      setFeedback("❌ Incorrect, try again.");
      setStreak(0);
    }
    setUserAnswer("");
  };

  const nextCard = () => {
    setIndex((index + 1) % cards.length);
    setFeedback("");
    setFlipped(false);
  };

  const previousCard = () => {
    setIndex((index - 1 + cards.length) % cards.length);
    setFeedback("");
    setFlipped(false);
  };

  const shuffleCards = () => {
    setCards([...cards].sort(() => Math.random() - 0.5));
    setIndex(0);
    setFeedback("");
  };

  const markAsMastered = () => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setMastered([...mastered, cards[index]]);
    setCards(updatedCards);
    setIndex(0);
    setFeedback("Card mastered and removed from deck!");
  };

  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="container">
      <h1>Learn Vietnamese!</h1>
      <h2>Learn Something new today!</h2>
      <p>Number of cards: {cards.length}</p>
      <p>Current Streak: {streak} | Longest Streak: {longestStreak}</p>
      <p><strong>Created by: Shamiah Bass | Z-Number: Z23526337</strong></p>

      <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={flipCard}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p>{cards[index]?.english}</p>
          </div>
          <div className="flashcard-back">
            <p>{cards[index]?.vietnamese}</p>
          </div>
        </div>
      </div>

      <p>Guess the answer here:</p>
      <input
        type="text"
        className="input"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter the Vietnamese word"
      />
      <button className="button" onClick={checkAnswer}>Submit Guess</button>
      <p className="feedback">{feedback}</p>

      <div>
        <button className="button" onClick={previousCard}>⬅️</button>
        <button className="button" onClick={nextCard}>➡️</button>
        <button className="shuffle-button" onClick={shuffleCards}>Shuffle Cards</button>
        <button className="button" onClick={markAsMastered}>Mastered</button>
      </div>

      <h3>Mastered Cards ({mastered.length})</h3>
      <ul>
        {mastered.map((card, idx) => (
          <li key={idx}>{card.english} - {card.vietnamese}</li>
        ))}
      </ul>
    </div>
  );
};

export default FlashcardGame;
