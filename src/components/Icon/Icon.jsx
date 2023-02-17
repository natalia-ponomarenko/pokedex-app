import React from 'react'
import PropTypes from 'prop-types'

export function Icon ({ side }) {
  return (
    <span>
      <i className={`fa-solid fa-caret-${side} main__icon`}></i>
    </span>
  )
}

Icon.propTypes = {
  side: PropTypes.string.isRequired
}
