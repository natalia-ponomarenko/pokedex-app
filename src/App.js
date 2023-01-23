import 'bulma'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './App.scss'
// import { Button } from './components/Button/Button'
import { Card } from './components/Card'
import { Stats } from './components/Stats/Stats'
import { getTypes } from './helpers/api'
import { URL50 } from './helpers/constants'
// , URL20, URL50, URL_ALL } from './helpers/constants'
import { modalStyles } from './helpers/modalStyles'

Modal.setAppElement('#root')

// const URL = 'https://pokeapi.co/api/v2/pokemon/'

function App () {
  const [pokemonData, setPokemonData] = useState([])
  // const [nextPage, setNextPage] = useState('')
  // const [prevPage, setPrevPage] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [pokemon, setPokemon] = useState([])
  const [types, setTypes] = useState([])

  //  const pagination = async (page) => {
  //   if (page === prevPage && !prevPage) {
  //     return
  //   }
  //   setNextPage(data.next)
  //   setPrevPage(data.previous)
  // }

  const dowloadData = async () => {
    setLoading(true)
    const response = await fetch(URL50)
    const data = await response.json()

    const loadPokemon = async (data) => {
      const pokemon = await Promise.all(
        data.map(async (pokemon) => {
          return await fetch(pokemon.url)
            .then((res) => res.json())
            .then((data) => data)
        })
      )

      setPokemonData(pokemon)
    }

    loadPokemon(data.results)
    getTypes().then((types) => setTypes(types))
    setLoading(false)
    console.log(pokemonData)
  }

  useEffect(() => {
    dowloadData()
  }, [])

  function openModal () {
    setIsOpen(true)
  }

  function closeModal () {
    setIsOpen(false)
  }

  const handlePokemonSelection = (pokemonId) => {
    setPokemon(pokemonData.filter((pokemon) => pokemon.id === pokemonId))
  }

  const handleChange = (event) => {
    const { value } = event.target
    const inputText = value.toLowerCase()
    setQuery(inputText)
    setPokemonData(
      pokemonData.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().startsWith(inputText) ||
          pokemon.name.toLowerCase().includes(inputText)
      )
    )
  }

  function filterByType (name) {
    const filteredPokemonList = pokemonData.filter((pokemon) =>
      pokemon.types.some((type) => type.type.name === name)
    )
    setPokemonData(filteredPokemonList)
  }

  return (
    <>
      <div className="header title is-2">Pokedex App</div>
      {loading
        ? (
        <>
          <div className="loader__container">
            <div className="loader"></div>
          </div>
        </>
          )
        : (
        <div className="main">
          {types.map((type) => (
            <button key={type.name} onClick={() => filterByType(type.name)}>
              {type.name}
            </button>
          ))}
          <input
            type="text"
            id="search-query"
            className="input input is-normal"
            placeholder="Start filter the pokemons!"
            value={query}
            onChange={handleChange}
          />
          <div className="main__container">
            { pokemonData.length
              ? (
                  pokemonData.map((pokemon) => (
              <Card
                key={pokemon.id}
                pokemon={pokemon}
                openModal={openModal}
                selectPokemon={handlePokemonSelection}
              />
                  ))
                )
              : (
              <div>No pokemons here. Try to load more and filter again</div>
                )
            }
          </div>
          <div className="main__button-container">
            {/* {prevPage && (
              <Button
                action={() => pagination(prevPage)}
                className="button is-warning is-focused"
              >
                &lt; Back
              </Button>
            )}
            {nextPage && (
              <Button
                action={() => pagination(nextPage)}
                className="button is-warning is-focused"
              >
                Next &gt;
              </Button>
            )} */}
            {/* {pokemonData.length > 10 && (
              <Button
                action={() => load(URL)}
                className="button is-info is-focused"
              >
                Load 10
              </Button>
            )}
            {pokemonData.length < 10 && (
              <Button
                action={() => load(URL_ALL)}
                className="button is-info is-focused"
              >
                Load all?
              </Button>
            )}
            {pokemonData.length !== 20 && (
              <Button
                action={() => load(URL20)}
                className="button is-info is-focused"
              >
                Load 20
              </Button>
            )}
            {pokemonData.length !== 50 && (
              <Button
                action={() => load(URL50)}
                className="button is-info is-focused"
              >
                Load 50
              </Button>
            )} */}
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={300}
          >
            <div>
              {pokemon.map((pokemon) => (
                <Stats
                  pokemon={pokemon}
                  key={pokemon.id}
                  closeModal={closeModal}
                />
              ))}
            </div>
          </Modal>
        </div>
          )}
    </>
  )
}

export default App
