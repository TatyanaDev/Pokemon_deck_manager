import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../../graphql/queries";
import Card from "../Card";
import "./styles.css";

const getRandomOffset = () => Math.floor(Math.random() * 1290);

const NewCardStack = ({ onSelect, onCardDrop, isDragging, setIsDragging, selectedCard }) => {
  const [offset] = useState(getRandomOffset());
  const [stack, setStack] = useState([]);

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 10, offset },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data && stack.length === 0) {
      setStack(data.pokemons.results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleDragStart = (e) => {
    if (stack.length === 0) {
      return;
    }

    setIsDragging(true);

    const pokemon = stack[0];

    e.dataTransfer.setData("pokemon", JSON.stringify(pokemon));

    setTimeout(() => {
      setStack((prevStack) => (prevStack.length > 1 ? prevStack.slice(1) : []));
    }, 100);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onCardDrop();
  };

  const handleCardClick = () => {
    if (stack.length > 0) {
      onSelect(stack[0]);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={`stack-wrapper ${isDragging ? "empty" : ""}`}>
      <h2 className="main-title">Card Stack</h2>
      {stack.length > 0 ? <Card pokemon={stack[0]} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} onSelect={handleCardClick} selectedCard={selectedCard} /> : null}
    </div>
  );
};

export default NewCardStack;
