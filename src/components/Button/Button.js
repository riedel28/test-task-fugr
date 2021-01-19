import React from 'react';

const Button = ({ children, onClick, type = 'submit', testId }) => {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold focus:outline-none py-2 px-4 rounded"
      type={type}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

export default Button;
