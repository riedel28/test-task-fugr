import React from 'react';

const Switcher = ({ onSelect, rowsToShow }) => {
  return (
    <div className="" data-testid="switcher">
      <button
        onClick={() => {
          onSelect('more');
        }}
        className={`${
          rowsToShow === 'more' ? 'bg-gray-200' : 'bg-transparent'
        } border border-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r-none rounded-l`}
      >
        Показать много
      </button>
      <button
        onClick={() => {
          onSelect('less');
        }}
        className={`${
          rowsToShow === 'less' ? 'bg-gray-200' : 'bg-transparent'
        } border border-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l-none rounded-r`}
      >
        Показать мало
      </button>
    </div>
  );
};

export default Switcher;
