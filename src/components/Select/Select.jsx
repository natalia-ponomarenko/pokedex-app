import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { URL10, URL20, URL50, URL_ALL } from '../../helpers/constants'

export function Select ({ loadPokemons }) {
  const [numberToLoad, setNumberToLoad] = useState('')

  function handleSelectChange (event) {
    switch (event.target.value) {
      case '10':
        setNumberToLoad(event.target.value)
        loadPokemons(URL10)
        break
      case '20':
        setNumberToLoad(event.target.value)
        loadPokemons(URL20)
        break
      case '50':
        setNumberToLoad(event.target.value)
        loadPokemons(URL50)
        break
      case 'all':
        setNumberToLoad(event.target.value)
        loadPokemons(URL_ALL)
        break
      default:
        setNumberToLoad(event.target.value)
        loadPokemons(URL10)
    }
  }
  return (
    <div className="select is-success">
      <select
        value={numberToLoad}
        onChange={(event) => handleSelectChange(event)}
        className="is-hovered"
      >
        <option disabled={true} value=''>Choose the number to load</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="all">all</option>
      </select>
  </div>
  )
}

Select.propTypes = {
  loadPokemons: PropTypes.func.isRequired
}
