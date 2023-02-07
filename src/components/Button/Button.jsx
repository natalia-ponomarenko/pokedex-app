import React from 'react'
import '../../App.scss'
import PropTypes from 'prop-types'

export const Button = ({ action, className, children }) => (
  <button className={className} onClick={action}>
    {children}
  </button>
)

Button.propTypes = {
  action: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.string.isRequired
}

Button.defaultProps = {
  action: () => {},
  className: 'button'
}
