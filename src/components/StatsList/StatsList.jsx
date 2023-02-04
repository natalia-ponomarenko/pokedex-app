import React from 'react'
import Modal from 'react-modal'
import { modalStyles } from '../../helpers/modalStyles'
import { Stats } from '../Stats/Stats'
import PropTypes from 'prop-types'

Modal.setAppElement('#root')

export function StatsList ({ pokemons, modalIsOpen, closeModal }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={300}
    >
      <div>
        {pokemons.map((pokemon) => (
          <Stats
            pokemon={pokemon}
            key={pokemon.id}
            closeModal={closeModal}
          />
        ))}
      </div>
    </Modal>
  )
}

StatsList.propTypes = {
  pokemons: PropTypes.arrayOf(PropTypes.shape({
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
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

StatsList.defaultProps = {
  pokemon: null
}
