import 'bulma'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './App.scss'
import { Button } from './components/Button/Button'
import { Card } from './components/Card'
import { Stats } from './components/Stats/Stats'
import { getTypes } from './helpers/api'
import { modalStyles } from './helpers/modalStyles'
import pokemonTypes from './helpers/pokemonTypes'
import { URL_ALL } from './helpers/constants'

Modal.setAppElement('#root')

function App () {
  const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=50')
  const [pokemonData, setPokemonData] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [prevPage, setPrevPage] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [pokemon, setPokemon] = useState([])
  const [types, setTypes] = useState([])

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

  useEffect(() => {
    const dowloadData = async (url) => {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      loadPokemon(data.results)
      setPrevPage(data.previous)
      setNextPage(data.next)
      getTypes().then((types) => setTypes(types))
      setLoading(false)
      console.log(pokemonData)
    }
    dowloadData(currentUrl)
  }, [currentUrl])

  function openModal () {
    setIsOpen(true)
  }

  function closeModal () {
    setIsOpen(false)
  }

  const handlePokemonSelection = (pokemonId) => {
    setPokemon(pokemonData.filter((pokemon) => pokemon.id === pokemonId))
  }

  const handleInputChange = (event) => {
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

  function goToTheNextPage () {
    setCurrentUrl(nextPage)
  }

  function goToThePreviousPage () {
    setCurrentUrl(prevPage)
  }

  function load (url) {
    setLoading(true)
    setCurrentUrl(url)
    setLoading(false)
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
          <div className="main__types-buttons">
          {types.map((type) => (
            <button key={type.name} onClick={() => filterByType(type.name)} className="main__type-button" style={{ backgroundColor: pokemonTypes[type.name] }}>
              {type.name}
            </button>
          ))}
          </div>
          <button onClick={() => load(URL_ALL)} className="button is-warning is-focused">Load `em all</button>
          <input
            type="text"
            id="search-query"
            className="input input is-normal"
            placeholder="Start filter the pokemons!"
            value={query}
            onChange={handleInputChange}
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
            {prevPage && (
              <Button
                action={() => goToThePreviousPage(prevPage)}
                className="button is-warning is-focused"
              >
                &lt; Back
              </Button>
            )}
            {nextPage && (
              <Button
                action={() => goToTheNextPage(nextPage)}
                className="button is-warning is-focused"
              >
                Next &gt;
              </Button>
            )}
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
