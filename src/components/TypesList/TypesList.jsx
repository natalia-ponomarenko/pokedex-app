import React from 'react'
import PropTypes from 'prop-types'
import pokemonTypes from '../../helpers/pokemonTypes'
import './TypesList.scss'

export function TypesList ({ types, filter }) {
  return (
    <div>
      {types.map((type) => (
        <button
          key={type.name}
          id={type.name}
          onClick={() => filter(type.name)}
          className="type-button"
          style={{ backgroundColor: pokemonTypes[type.name] }}
        >
          {type.name}
        </button>
      ))}
    </div>
  )
}

TypesList.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired,
  filter: PropTypes.func.isRequired
}
