import React, { useEffect, useState } from 'react';
import { Card } from './components/Card';
// import { Button } from './components/Button/Button';
import { getAllPokemon, getPokemon } from './helpers/api';
import { URL, URL20, URL50 } from './helpers/constants';
import './App.scss';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [loading, setLoading] = useState(true);

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

  // handleChange = (actualEvent) => {
  //   const { value } = actualEvent.target;
  //   const inputText = value.toLowerCase();

  //   this.setState({
  //     query: value,
  //     movies: moviesFromServer.filter(
  //       movie => movie.title.toLowerCase().includes(
  //         inputText,
  //       )
  //       || movie.description.toLowerCase().includes(
  //         inputText,
  //       ),
  //     ),
  //   });
  // }

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
            // value={this.state.query}
            // onChange={this.handleChange}
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
            <button
              className='main__button'
              onClick={next}
            >
              Load more
            </button>
          
          {prevPage && (
            <button
              className='main__button'
              onClick={previous}
            >
              Back
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
            <button
              className='main__button'
              onClick={() => load(URL20)}
            >
              Load 20
            </button>
            <button
              className='main__button'
              onClick={() => load(URL50)}
            >
              Load 50
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;