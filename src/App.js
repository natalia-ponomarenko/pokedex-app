import 'bulma'
import React, { useEffect, useState } from 'react'
import './App.scss'
import { Button } from './components/Button/Button'
import { getTypes } from './helpers/api'
import pokemonTypes from './helpers/pokemonTypes'
import { URL10 } from './helpers/constants'
import { Loader } from './components/Loader'
import { StatsList } from './components/StatsList/StatsList'
import { PokemonList } from './components/PokemonList/PokemonList'
import { Select } from './components/Select/Select'
import { Input } from './components/Input/Input'

function App () {
  const [currentUrl, setCurrentUrl] = useState(URL10)
  const [pokemonData, setPokemonData] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [prevPage, setPrevPage] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [pokemons, setPokemon] = useState([])
  const [types, setTypes] = useState([])
  const [filterArray, setFilterArray] = useState([])
  const [filteredData, setFilteredData] = useState(pokemonData)

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
    }
    dowloadData(currentUrl)
    setFilterArray([])
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

  function filterByType (name) {
    const filterButton = document.getElementById(name)
    filterButton.classList.toggle('pressed')
    if (filterArray.includes(name)) {
      const index = filterArray.indexOf(name)
      if (index > -1) {
        filterArray.splice(index, 1)
      }
    } else {
      filterArray.push(name)
    }

    setFilterArray(filterArray)

    if (!filterArray.length) {
      setFilteredData(pokemonData)
      return
    }

    const filteredData = pokemonData.filter((pokemon) =>
      pokemon.types.some((el) =>
        filterArray.includes(el.type.name.toLowerCase())
      )
    )
    setFilteredData(filteredData)
  }

  function loadPokemons (url) {
    setCurrentUrl(url)
  }

  return (
    <>
      {/* <div className="header title is-2">Pokedex App</div> */}
      {loading
        ? (
          <Loader />
          )
        : (
        <div className="main">
          <div className="main__types-buttons">
            {types.map((type) => (
              <button
                key={type.name}
                id={type.name}
                onClick={() => filterByType(type.name)}
                className="main__type-button"
                style={{ backgroundColor: pokemonTypes[type.name] }}
              >
                {type.name}
              </button>
            ))}
          </div>
          <div className="main__query-wrapper">
            <Select loadPokemons={loadPokemons}/>
            <Input
              setFilteredData={setFilteredData}
              pokemonData={pokemonData}
            />
          </div>
          <div className="main__container">
            {filteredData.length
              ? (
                <PokemonList
                  filteredData={filteredData}
                  openModal={openModal}
                  handlePokemonSelection={handlePokemonSelection}
                />
                )
              : (
              <div>No pokemons here. Try to load more and filter again</div>
                )}
          </div>
          <div className="main__button-container">
            {prevPage && (
              <Button
                action={() => loadPokemons(prevPage)}
                className="button is-warning is-focused"
              >
                &lt; Back
              </Button>
            )}
            {nextPage && (
              <Button
                action={() => loadPokemons(nextPage)}
                className="button is-warning is-focused"
              >
                Next &gt;
              </Button>
            )}
          </div>
          <StatsList
            pokemons={pokemons}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
          />
        </div>
          )}
    </>
  )
}

export default App
