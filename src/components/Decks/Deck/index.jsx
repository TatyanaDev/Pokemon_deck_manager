import Card from "../../Card";
import "./styles.css";

const Deck = ({ title, cards, onDrop, onSelect, onCardDrop, selectedCard }) => {
  const handleDrop = (e) => {
    e.preventDefault();

    const data = e.dataTransfer.getData("pokemon");

    if (!data) {
      console.warn("No pokemon data found in drag event!");
      return;
    }

    try {
      const pokemon = JSON.parse(data);

      onDrop(pokemon);

      if (onCardDrop) {
        onCardDrop();
      }
    } catch (err) {
      console.error("Error parsing Pokémon data:", err, "Data:", data);
    }
  };

  return (
    <div className="deck" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      {title}

      <div className="deck-cards">
        {cards.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} onSelect={onSelect} draggable onDragStart={({ dataTransfer }) => dataTransfer.setData("pokemon", JSON.stringify(pokemon))} selectedCard={selectedCard} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
