import React from 'react'
import { Card } from '../Card/Card'

export function PokemonList ({ filteredData, openModal, handlePokemonSelection }) {
  return (
    filteredData.map((pokemon) => (
      <Card
        key={pokemon.id}
        pokemon={pokemon}
        openModal={openModal}
        selectPokemon={handlePokemonSelection}
      />
    ))
  )
}
