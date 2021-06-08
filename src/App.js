import React, { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { Button } from './components/Button/Button';
import { getAllPokemon, getPokemon } from './helpers/api';
import { URL, URL20, URL50, URL_ALL } from './helpers/constants';
import './App.scss';
require('dotenv').config();

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(URL);
      setNextPage(response.next);
      setPrevPage(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }

    fetchData();
  }, []);

  const loadingPokemon = async(data) => {
    let pokemon = await Promise.all(
      data.map(async pokemon => {
        return await getPokemon(pokemon.url);
      }
    ));

    setPokemonData(pokemon);
  };

  const load = async(url) => {
    setLoading(true);
    let response = await getAllPokemon(url);
    setNextPage(response.next);
    setPrevPage(response.previous);
    await loadingPokemon(response.results);
    setLoading(false);
  }

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextPage);
    await loadingPokemon(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);
    setLoading(false);
  }

  const previous = async () => {
    if (!prevPage) return;
    setLoading(true);
    let data = await getAllPokemon(prevPage);
    await loadingPokemon(data.results);
    setNextPage(data.next);
    setPrevPage(data.previous);
    setLoading(false);
  }

  const handleChange = (event) => {
    const { value } = event.target;
    const inputText = value.toLowerCase();
    console.log(inputText)
    setQuery(inputText);
    setPokemonData(pokemonData.filter(pokemon => pokemon.name.toLowerCase().startsWith(
      inputText,
    ) || pokemon.name.toLowerCase().includes(
      inputText,
    )));
  }

  return (
    <>
    <h1 className="header">Pokedex App</h1>
      {loading ? (
        <>
          <div className='loader__container'>
            <div className='loader'>
            </div>
          </div>
        </>
      ) : (
        <div className='main'>
          <input
            type="text"
            id="search-query"
            className="main__input"
            placeholder="Start filter the pokemons!"
            value={query}
            onChange={handleChange}
          />
          <div className="main__container">
            {pokemonData.map(pokemon => (
              <Card
                key={pokemon.id}
                pokemon={pokemon}
              />
            ))}
          </div>
          <div className='main__button-container'>
            {/* <Button onClick={next}>
            Load more
          </Button> */}
            {prevPage && (
              <button
                className='main__button'
                onClick={previous}
              >
                Back
              </button>
            )}

            {nextPage && (
              <button
                className='main__button'
                onClick={next}
              >
                Load more
              </button>
            )}

            {pokemonData.length > 10 &&
              <button
                className='main__button'
                onClick={() => load(URL)}
              >
                Load 10
              </button>
            }

            {pokemonData.length < 10 &&
              <button
                className='main__button'
                onClick={() => load(URL_ALL)}
              >
                Load all?
              </button>
            }

            {pokemonData.length !== 20 && (
              <button
                className='main__button'
                onClick={() => load(URL20)}
              >
                Load 20
              </button>
            )}

            {pokemonData.length !== 50 && (
              <button
                className='main__button'
                onClick={() => load(URL50)}
              >
                Load 50
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;