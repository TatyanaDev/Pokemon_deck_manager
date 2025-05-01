import { useRef, useEffect } from "react";
import "./styles.css";

const Card = ({ pokemon, draggable, onDragStart, onDragEnd, onSelect, selectedCard }) => {
  const isSelected = selectedCard && selectedCard.id === pokemon.id;
  const dragImageRef = useRef(null);

  useEffect(() => {
    if (dragImageRef.current) {
      dragImageRef.current.style.display = "block";
    }
  }, []);

  const handleDragStart = (e) => {
    onDragStart(e);

    if (dragImageRef.current) {
      e.dataTransfer.setDragImage(dragImageRef.current, 30, 30);
    }
  };

  return (
    <>
      <div className={`card ${isSelected ? "selected-outline" : ""}`} draggable={draggable} onDragStart={handleDragStart} onDragEnd={onDragEnd} onClick={() => onSelect(pokemon)}>
        <img className="card-image" src={pokemon.image} alt={pokemon.name} />
        <p className="sub-title">{pokemon.name}</p>
      </div>

      <div ref={dragImageRef} className="drag-image">
        <div className={`card ${isSelected ? "selected" : ""}`}>
          <img className="card-image" src={pokemon.image} alt={pokemon.name} />
          <p className="sub-title">{pokemon.name}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
