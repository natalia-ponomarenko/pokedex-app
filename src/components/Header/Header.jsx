import React from 'react'
import './Header.scss'

export function Header () {
  return (
    <div className='header'>
      <img src="../../images/pokemon-logo.png" alt="Pokemon Logo" className='header__image' />
      <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokeAPI</a>
    </div>
  )
}
