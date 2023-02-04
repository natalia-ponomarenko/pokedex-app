import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { URL10, URL20, URL50, URL_ALL } from '../../helpers/constants'

export function Select ({ loadPokemons }) {
  const [numberToLoad, setNumberToLoad] = useState('')

  function handleSelectChange (e) {
    switch (e.target.value) {
      case '10':
        loadPokemons(URL10)
        setNumberToLoad(e.target.value)
        break
      case '20':
        loadPokemons(URL20)
        setNumberToLoad(e.target.value)
        break
      case '50':
        loadPokemons(URL50)
        setNumberToLoad(e.target.value)
        break
      case 'all':
        loadPokemons(URL_ALL)
        setNumberToLoad(e.target.value)
        break
      default:
        loadPokemons(URL10)
        setNumberToLoad(e.target.value)
    }
  }
  return (
    <div className="select is-success">
    <select
      onChange={(e) => handleSelectChange(e)}
      value={numberToLoad}
      className="is-hovered"
    >
      <option disabled={true} value="">Choose the number to load</option>
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
