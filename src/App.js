import 'bulma'
import './styles/App.scss'
import React, { useEffect, useState } from 'react'
import { Button } from './components/Button'
import { Loader } from './components/Loader'
import { StatsList } from './components/StatsList'
import { PokemonList } from './components/PokemonList'
import { Input } from './components/Input'
import { Header } from './components/Header'
import { TypesList } from './components/TypesList'
import { Message } from './components/Message'
import { Select } from './components/Select'
import { Icon } from './components/Icon'
import { getTypes } from './helpers/api'
import { URL10, URL20, URL50, URL_ALL } from './helpers/constants'

function App () {
  const [currentUrl, setCurrentUrl] = useState(URL10)
  const [pokemonData, setPokemonData] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [prevPage, setPrevPage] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [pokemon, setPokemon] = useState([])
  const [types, setTypes] = useState([])
  const [filterArray, setFilterArray] = useState([])
  const [filteredData, setFilteredData] = useState(pokemonData)
  const [numberToLoad, setNumberToLoad] = useState('')
  const [errorText, setErrorText] = useState('')

  const loadPokemon = async (data) => {
    try {
      const pokemon = await Promise.all(
        data.map(async (pokemon) => {
          return await fetch(pokemon.url)
            .then((res) => res.json())
            .then((data) => data)
        })
      )
      setPokemonData(pokemon)
    } catch (error) {
      setErrorText(error.message)
    }
  }

  useEffect(() => {
    const dowloadData = async (url) => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        loadPokemon(data.results)
        setPrevPage(data.previous)
        setNextPage(data.next)
        getTypes().then((types) => setTypes(types))
        setLoading(false)
      } catch (error) {
        setErrorText(error.message)
      }
    }
    dowloadData(currentUrl)
    setFilterArray([])
  }, [currentUrl])

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handlePokemonSelection = (pokemonId) => {
    setPokemon(pokemonData.filter((pokemon) => pokemon.id === pokemonId))
  }

  const filterByType = (name) => {
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

  const loadPokemons = (url) => {
    setCurrentUrl(url)
  }

  const handleSelectChange = (event) => {
    switch (event.target.value) {
      case '10':
        loadPokemons(URL10)
        setNumberToLoad(event.target.value)
        break
      case '20':
        loadPokemons(URL20)
        setNumberToLoad(event.target.value)
        break
      case '50':
        loadPokemons(URL50)
        setNumberToLoad(event.target.value)
        break
      case 'all':
        loadPokemons(URL_ALL)
        setNumberToLoad(event.target.value)
        break
      default:
        loadPokemons(URL10)
        setNumberToLoad('10')
    }
  }

  return (
    <>
      <Header />
      {loading
        ? (
        <Loader />
          )
        : (
        <div className="main">
          <div className="main__types-buttons">
            <TypesList types={types} filter={filterByType} />
          </div>
          <div className="main__query-wrapper">
            <Select
              value={numberToLoad}
              handleSelectChange={handleSelectChange}
            />
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
              <Message
                text={errorText || 'No pokemons here. Try to load more!'}
              />
                )}
          </div>
          <div className="main__button-container">
            {prevPage && (
              <Button
                action={() => loadPokemons(prevPage)}
                className="button is-warning is-focused"
              >
                <Icon side="left" />
                Back
              </Button>
            )}
            {nextPage && (
              <Button
                action={() => loadPokemons(nextPage)}
                className="button is-warning is-focused"
              >
                Next
                <Icon side="right" />
              </Button>
            )}
          </div>
          <StatsList
            pokemon={pokemon}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
          />
        </div>
          )}
    </>
  )
}

export default App
