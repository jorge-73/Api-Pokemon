// COMPONENTS
import { Button } from "./Components/Button";
import { Card } from "./Components/Card";
// STYLES
import "./Sass/App.scss";
// ICONS
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
// HOOKS
import { useState, useEffect } from "react";

export const App = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvolution, setPokemonEvolution] = useState([]);

  useEffect(() => {
    pokeApi(pokemonId);
  }, [pokemonId]);

  const pokeApi = async (id) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/evolution-chain/${id}/`
      );
      const data = await response.json();

      let pokemonEvoArray = [];

      let pokemonLvl1 = data.chain.species.name;
      let pokemonLvl1Img = await getPokemonNames(pokemonLvl1);
      pokemonEvoArray.push([pokemonLvl1, pokemonLvl1Img]);

      if (data.chain.evolves_to.length !== 0) {
        let pokemonLvl2 = data.chain.evolves_to[0].species.name;
        let pokemonLvl2Img = await getPokemonNames(pokemonLvl2);
        pokemonEvoArray.push([pokemonLvl2, pokemonLvl2Img]);

        if (data.chain.evolves_to[0].evolves_to.length !== 0) {
          let pokemonLvl3 = data.chain.evolves_to[0].evolves_to[0].species.name;
          let pokemonLvl3Img = await getPokemonNames(pokemonLvl3);
          pokemonEvoArray.push([pokemonLvl3, pokemonLvl3Img]);
        }
      }
      setPokemonEvolution(pokemonEvoArray);

    } catch (error) {
      console.log(error);
    }
  };

  const getPokemonNames = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data.sprites.other["official-artwork"].front_default;
  };

  const prevClick = () => {
    pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1);
  };

  const nextClick = () => {
    setPokemonId(pokemonId + 1);
  };

  return (
    <div className="App">
      {/* TTITULO */}
      <h1>React Api | Pokemon y sus Evoluciones</h1>
      {/* TARJETAS */}
      <div className={`card-container card${pokemonEvolution.length}`}>
        {pokemonEvolution.map((pokemon) => (
          <Card key={pokemon[0]} name={pokemon[0]} image={pokemon[1]} />
        ))}
      </div>

      {/* BOTONES */}
      <div className="buttons-container">
        <Button icon={<TiArrowLeftOutline />} handleClick={prevClick} />
        <Button icon={<TiArrowRightOutline />} handleClick={nextClick} />
      </div>
    </div>
  );
};
