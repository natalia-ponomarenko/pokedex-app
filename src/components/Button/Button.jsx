import React from 'react';
import '../../App.css';

export const Button = ({ onclick, children }) => (
    <button
      className='main__button'
      onClick={onclick}
    >
    {children}
  </button>
);
