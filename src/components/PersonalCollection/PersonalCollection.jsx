import React from 'react'
import { Card } from '../Card/Card'

export function PersonalCollection ({
  personalCollection,
  handlePokemonSelection
}) {
  return personalCollection.map((pokemon) => (
    <Card
      key={pokemon.id}
      pokemon={pokemon}
      selectPokemon={handlePokemonSelection}
    />
  ))
}
