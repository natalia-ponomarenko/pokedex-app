import React from 'react'
import PropTypes from 'prop-types'

export function Message ({ text }) {
  return (
    <div className="main__message" id="message">
      {text}
    </div>
  )
}

Message.propTypes = {
  text: PropTypes.string.isRequired
}
