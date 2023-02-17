import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ action, className, children }) => (
  <button className={className} onClick={action}>
    {children}
  </button>
)

Button.propTypes = {
  action: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.array || PropTypes.string
}

Button.defaultProps = {
  className: 'button'
}
