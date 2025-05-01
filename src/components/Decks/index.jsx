import { useState } from "react";
import Deck from "./Deck";
import "./styles.css"

const Decks = ({ onSelect, onCardDrop, selectedCard }) => {
  const [editing, setEditing] = useState(null);
  const [deck1, setDeck1] = useState([]);
  const [deck2, setDeck2] = useState([]);
  const [titles, setTitles] = useState({
    deck1: "Untitled Deck",
    deck2: "Untitled Deck",
  });

  const moveCard = (pokemon, targetDeckSetter, targetDeck, sourceDeckSetter) => {
    if (targetDeck.some(({ id }) => id === pokemon.id)) {
      return;
    }

    sourceDeckSetter((prev) => prev.filter(({ id }) => id !== pokemon.id));
    targetDeckSetter((prev) => [...prev, pokemon]);
  };

  const handleTitleChange = ({ target }, deckKey) => setTitles((prev) => ({ ...prev, [deckKey]: target.value }));

  const handleTitleBlur = (deckKey) => {
    setTitles((prev) => ({
      ...prev,
      [deckKey]: !prev[deckKey].trim() ? "Untitled Deck" : prev[deckKey],
    }));

    setEditing(null);
  };

  const handleTitleKeyDown = ({ key }) => {
    if (key === "Enter") {
      setEditing(null);
    }
  };

  const handleEditClick = (deckKey) => {
    setTitles((prev) => ({
      ...prev,
      [deckKey]: prev[deckKey] === "Untitled Deck" ? "" : prev[deckKey],
    }));

    setEditing(deckKey);
  };

  const renderDeck = (deckKey, deckData, setDeckData, otherDeckData, setOtherDeckData) => (
    <Deck
      title={
        editing === deckKey ? (
          <input type="text" value={titles[deckKey]} autoFocus className="main-title deck-title-input" onChange={(e) => handleTitleChange(e, deckKey)} onBlur={() => handleTitleBlur(deckKey)} onKeyDown={(e) => handleTitleKeyDown(e, deckKey)} />
        ) : (
          <h2 className={`main-title ${titles[deckKey] === "Untitled Deck" ? "untitled" : ""}`} onClick={() => handleEditClick(deckKey)}>
            {titles[deckKey] || "Untitled Deck"}
          </h2>
        )
      }
      cards={deckData}
      onDrop={(pokemon) => moveCard(pokemon, setDeckData, deckData, setOtherDeckData, otherDeckData)}
      onSelect={onSelect}
      onCardDrop={onCardDrop}
      selectedCard={selectedCard}
    />
  );

  return (
    <div className="decks">
      {renderDeck("deck1", deck1, setDeck1, deck2, setDeck2)}
      {renderDeck("deck2", deck2, setDeck2, deck1, setDeck1)}
    </div>
  );
};

export default Decks;
