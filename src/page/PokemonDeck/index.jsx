import { useState } from "react";
import SelectedCardDisplay from "../../components/SelectedCardDisplay";
import NewCardStack from "../../components/NewCardStack";
import Decks from "../../components/Decks";
import "./styles.css";

const PokemonDeck = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleCardDrop = () => setIsDragging(false);

  return (
    <div className="app-wrapper">
      <NewCardStack onSelect={setSelectedCard} onCardDrop={handleCardDrop} isDragging={isDragging} setIsDragging={setIsDragging} selectedCard={selectedCard} />
      <div className="center-container">
        <SelectedCardDisplay selectedCard={selectedCard} />
      </div>
      <Decks onSelect={setSelectedCard} onCardDrop={handleCardDrop} selectedCard={selectedCard} />
    </div>
  );
};

export default PokemonDeck;
