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
import { URL_ALL, URL20, URL50 } from './helpers/constants'

Modal.setAppElement('#root')

function App () {
  const [currentUrl, setCurrentUrl] = useState(URL20)
  const [pokemonData, setPokemonData] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [prevPage, setPrevPage] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [pokemon, setPokemon] = useState([])
  const [types, setTypes] = useState([])
  const [filterArray, setFilterArray] = useState([])
  const [numberToLoad, setNumberToLoad] = useState('20')

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

  const [filteredData, setFilteredData] = useState(pokemonData)
  const [filter, setFilter] = useState('')

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

  useEffect(() => {
    if (!filter) {
      setFilteredData(pokemonData)
      return
    }
    const query = filter.toLowerCase()
    const filteredData = filter
      ? pokemonData.filter(pokemon => pokemon.name.toLowerCase().startsWith(query))
      : pokemonData
    setFilteredData(filteredData)
  }, [filter, pokemonData])

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
      pokemon.types.some((el) => filterArray.includes(el.type.name.toLowerCase()))
    )
    setFilteredData(filteredData)
  }

  function handleSelectChange (e) {
    switch (e.target.value) {
      case '20':
        load(URL20)
        setNumberToLoad(e.target.value)
        break
      case '50':
        load(URL50)
        setNumberToLoad(e.target.value)
        break
      case 'all':
        load(URL_ALL)
        setNumberToLoad(e.target.value)
        break
      default:
        load(URL20)
    }
  }

  function load (url) {
    setCurrentUrl(url)
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
            <button key={type.name} id={type.name} onClick={() => filterByType(type.name)} className="main__type-button" style={{ backgroundColor: pokemonTypes[type.name] }}>
              {type.name}
            </button>
          ))}
          </div>
          <select onChange={(e) => handleSelectChange(e)} value={numberToLoad}>
          <option>choose the number to load</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
            <option value='all'>all</option>
          </select>
          <input
            type="text"
            id="search-query"
            className="input input is-normal"
            placeholder="Start filter the pokemons!"
            value={filter}
            onChange={({ currentTarget: { value } }) => setFilter(value)}
          />
          <div className="main__container">
            { pokemonData.length
              ? (
                  filteredData.map((pokemon) => (
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
                action={() => load(prevPage)}
                className="button is-warning is-focused"
              >
                &lt; Back
              </Button>
            )}
            {nextPage && (
              <Button
                action={() => load(nextPage)}
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
