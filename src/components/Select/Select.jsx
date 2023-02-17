import React from 'react'
import PropTypes from 'prop-types'

export function Select ({ handleSelectChange, value }) {
  return (
    <div className="select is-success">
      <select
        value={value}
        onChange={(event) => handleSelectChange(event)}
        className="is-hovered"
      >
        <option value="10">load 10</option>
        <option value="20">load 20</option>
        <option value="50">load 50</option>
        <option value="all">load all</option>
      </select>
    </div>
  )
}

Select.propTypes = {
  handleSelectChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}
