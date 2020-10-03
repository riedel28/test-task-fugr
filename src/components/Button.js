import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
      data-testid="form-open-button"
    >
      {children}
    </button>
  );
};

export default Button;
