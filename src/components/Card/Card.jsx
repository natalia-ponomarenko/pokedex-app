import React from 'react'
import PropTypes from 'prop-types'
import pokemonTypes from '../../helpers/pokemonTypes'
import './Card.scss'

export const Card = ({ pokemon, selectPokemon, openModal }) => {
  const addDefaultSrc = (event) => {
    event.target.src = '../images/Poke_ball.png'
  }

  return (
    <div className="card">
      <div
        className="card__card"
        onClick={() => {
          selectPokemon(pokemon.id)
          openModal()
        }}
      >
        <div className="card__container-wrapper">
          <div className="card__height-container">
            <span className="card__height">
              <div>Height:</div>
              <div>{`${pokemon.height / 10} m`}</div>
            </span>
          </div>
          <div className="card__weight-container">
            <span className="card__weight">
              <div>Weight:</div>
              <div>{`${pokemon.weight / 100} kg`}</div>
            </span>
          </div>
        </div>
        <div className="card__name">{`${pokemon.name}`}</div>
        <div className="card__image-container">
          <img
            className="card__image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            onError={addDefaultSrc}
            alt={pokemon.name}
          />
        </div>
        <div className="card__types">
          {pokemon.types.map((type) => (
            <div
              className="card__type"
              key={type.slot}
              style={{ backgroundColor: pokemonTypes[type.type.name] }}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <div className="card__moves">
          {`Total moves: ${pokemon.moves.length}`}
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  pokemon: PropTypes.shape({
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
  }),
  selectPokemon: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
}

Card.defaultProps = {
  pokemon: {}
}
