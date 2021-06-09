import 'bulma'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './App.scss'
import { Button } from './components/Button/Button'
import { Card } from './components/Card'
import { Stats } from './components/Stats/Stats'
import { getAllPokemon, getPokemon } from './helpers/api'
import { URL, URL20, URL50, URL_ALL } from './helpers/constants'
import { modalStyles } from './helpers/modalStyles'

Modal.setAppElement('#root')

function App () {
  const [pokemonData, setPokemonData] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [prevPage, setPrevPage] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    const downloadData = async () => {
      const response = await getAllPokemon(URL)
      setNextPage(response.next)
      setPrevPage(response.previous)
      await loadPokemon(response.results)
      setLoading(false)
    }

    downloadData()
  }, [])

  const loadPokemon = async (data) => {
    const pokemon = await Promise.all(
      data.map(async pokemon => {
        return await getPokemon(pokemon.url)
      }
      ))

    setPokemonData(pokemon)
  }

  function openModal () {
    setIsOpen(true)
  }

  function closeModal () {
    setIsOpen(false)
  }

  const handlePokemonSelection = (pokemonId) => {
    setPokemon(pokemonData.filter(pokemon => pokemon.id === pokemonId))
  }

  const load = async (url) => {
    setLoading(true)
    const response = await getAllPokemon(url)
    setNextPage(response.next)
    setPrevPage(response.previous)
    await loadPokemon(response.results)
    setLoading(false)
  }

  const next = async () => {
    setLoading(true)
    const data = await getAllPokemon(nextPage)
    await loadPokemon(data.results)
    setNextPage(data.next)
    setPrevPage(data.previous)
    setLoading(false)
  }

  const previous = async () => {
    if (!prevPage) return
    setLoading(true)
    const data = await getAllPokemon(prevPage)
    await loadPokemon(data.results)
    setNextPage(data.next)
    setPrevPage(data.previous)
    setLoading(false)
  }

  const handleChange = (event) => {
    const { value } = event.target
    const inputText = value.toLowerCase()
    setQuery(inputText)
    setPokemonData(pokemonData.filter(
      pokemon => pokemon.name.toLowerCase().startsWith(inputText) ||
      pokemon.name.toLowerCase().includes(inputText))
    )
  }

  return (
    <>
    <div className="header title is-2">Pokedex App</div>
      {loading
        ? (
        <>
          <div className='loader__container'>
            <div className='loader'>
            </div>
          </div>
        </>
          )
        : (
        <div className='main'>
          <input
            type="text"
            id="search-query"
            className="input input is-normal"
            placeholder="Start filter the pokemons!"
            value={query}
            onChange={handleChange}
          />
          <div className="main__container">
            {pokemonData.map(pokemon => (
              <Card
                key={pokemon.id}
                pokemon={pokemon}
                openModal={openModal}
                selectPokemon={handlePokemonSelection}
              />
            ))}
          </div>
          <div className='main__button-container'>
            {prevPage && (
              <Button action={previous} className="button is-warning is-focused">
                &lt; Back
              </Button>
            )}
            {nextPage && (
              <Button action={next} className="button is-warning is-focused">
                Next &gt;
              </Button>
            )}
            {pokemonData.length > 10 &&
              <Button action={() => load(URL)} className="button is-info is-focused">
              Load 10
              </Button>
            }
            {pokemonData.length < 10 &&
              <Button action={() => load(URL_ALL)} className="button is-info is-focused">
              Load all?
              </Button>
            }
            {pokemonData.length !== 20 && (
              <Button action={() => load(URL20)} className="button is-info is-focused">
              Load 20
              </Button>
            )}
            {pokemonData.length !== 50 && (
              <Button action={() => load(URL50)} className="button is-info is-focused">
              Load 50
              </Button>
            )}
          </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={modalStyles}
              contentLabel='Example Modal'
              closeTimeoutMS={300}
            >
              <div>
                {pokemon.map(pokemon => (
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
