import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_POKEMON } from "../../graphql/queries";
import "./styles.css";

const SelectedCardDisplay = ({ selectedCard }) => {
  const [fetchPokemonDetails, { data, loading, error }] = useLazyQuery(GET_POKEMON);

  useEffect(() => {
    if (selectedCard?.name) {
      fetchPokemonDetails({ variables: { name: selectedCard.name } });
    }
  }, [selectedCard, fetchPokemonDetails]);

  if (!selectedCard) {
    return null;
  }

  if (error) {
    return <p>Error fetching details: {error.message}</p>;
  }

  const pokemonData = data?.pokemon;

  return (
    <div className="selected-card">
      <img className="selected-card-image" src={selectedCard.image} alt={selectedCard.name} />

      {!pokemonData || loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="pokemon-info-wrapper">
            <div className="pokemon-info">
              <h1 className="pokemon-name">{pokemonData.name}</h1>
              <>
                {pokemonData.abilities &&
                  pokemonData.abilities.map(({ ability }, index) => (
                    <span className="pokemon-ability" key={index}>
                      {ability.name}
                    </span>
                  ))}
              </>
            </div>

            <p className="pokemon-id">#{pokemonData.id}</p>
          </div>

          <div className="pokemon-additional-info-wrapper">
            <p>{pokemonData.weight}kg</p>
            <p>{pokemonData.height}cm</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedCardDisplay;
