import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export function Input ({ setFilteredData, pokemonData }) {
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (!filter) {
      setFilteredData(pokemonData)
      return
    }
    const query = filter.toLowerCase()
    const filteredData = filter
      ? pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(query)
      )
      : pokemonData
    setFilteredData(filteredData)
  }, [filter, pokemonData])

  return (
    <input
      type="text"
      id="search-query"
      className="input is-success"
      placeholder="Start filter the pokemons!"
      value={filter}
      onChange={({ currentTarget: { value } }) => setFilter(value)}
    />
  )
}

Input.propTypes = {
  pokemonData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        slot: PropTypes.number
      })
    ).isRequired,
    moves: PropTypes.arrayOf(PropTypes.object).isRequired
  })),
  setFilteredData: PropTypes.func.isRequired
}

Input.defaultProps = {
  pokemon: null
}
