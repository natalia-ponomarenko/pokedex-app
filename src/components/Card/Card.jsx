import React from 'react';
import './Card.scss';
import pokemonTypes from '../../helpers/pokemonTypes';

export function Card({ pokemon }) {
  return (
    <div className='card'>
      <div className="card__container-wrapper">
        <div className='card__height-container'>
          <span className='card__height'>
            <div>
              Height:
            </div>
            <div>
              {`${pokemon.height / 10} m`}
            </div>
          </span>
        </div>
        <div className='card__weight-container'>
          <span className='card__weight'>
            <div>
              Weight:
            </div>
            <div>
              {`${pokemon.weight / 100} kg`}
            </div>
          </span>
        </div>
      </div>
      <div className='card__name'>
          {`${pokemon.name}`}
      </div>
      <div className='card__image-container'>
        <img
          className='card__image'
          src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
        />
      </div>
      <div className='card__types'>
        {pokemon.types.map(type => (
          <div
            className='card__type'
            key={type.slot}
            style={{ backgroundColor: pokemonTypes[type.type.name] }}
          >
            {type.type.name}
          </div>
        ))}
      </div>
      <div className='card__moves'>
        {`Total moves: ${pokemon.moves.length}`}
      </div>
    </div>
  );
}