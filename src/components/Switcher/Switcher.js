import React from 'react';

const Switcher = ({ onSelect, amountOfRecords }) => {
  return (
    <div className="" data-testid="switcher">
      <button
        onClick={() => {
          onSelect(1000);
        }}
        className={`${
          amountOfRecords === 1000 ? 'bg-gray-200' : 'bg-transparent'
        } border border-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r-none rounded-l`}
      >
        Show more
      </button>
      <button
        onClick={() => {
          onSelect(32);
        }}
        className={`${
          amountOfRecords === 32 ? 'bg-gray-200' : 'bg-transparent'
        } border border-gray-300 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l-none rounded-r`}
      >
        Show less
      </button>
    </div>
  );
};

export default Switcher;
