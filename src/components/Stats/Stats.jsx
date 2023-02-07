import React from 'react'
import './Stats.scss'
import PropTypes from 'prop-types'

export const Stats = ({ pokemon, closeModal }) => {
  const addDefaultSrc = (event) => {
    event.target.src = '../images/Poke_ball.png'
  }

  return (
    <div className="stats__container" onClick={closeModal}>
      <div className="stats__image-container">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          onError={addDefaultSrc}
          alt={pokemon.name}
          className="stats__image"
        />
      </div>
      <div className="stats__name">{`${pokemon.name}`}</div>
      <div className="stats__stats">
        {pokemon.stats.map((stat) => (
          <div className="stats__stat-container" key={stat.stat.name}>
            <div className="stats__stat-name">{stat.stat.name}</div>
            <div className="stats__base-stat"></div>
            <div className="stats__base-stat-value">{stat.base_stat}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

Stats.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        base_stat: PropTypes.number.isRequired,
        stat: PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      })
    ).isRequired
  }),
  closeModal: PropTypes.func.isRequired
}

Stats.defaultProps = {
  pokemon: {}
}
