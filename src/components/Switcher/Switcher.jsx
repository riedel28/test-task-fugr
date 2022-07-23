import React from 'react';

const Switcher = ({ onSelect, amountOfRecords }) => {
  return (
    <div className="" data-testid="switcher">
      <button
        onClick={() => {
          onSelect(1000);
        }}
        className={`${
          amountOfRecords === 1000 ? 'bg-gray-100' : 'bg-transparent'
        } border border-gray-300  bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 text-gray-700 text-sm font-semibold py-2 px-4 rounded-r-none rounded-md`}
      >
        <span className="mr-2">Show</span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            amountOfRecords === 1000
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          1000
        </span>
      </button>
      <button
        onClick={() => {
          onSelect(32);
        }}
        className={`${
          amountOfRecords === 32 ? 'bg-gray-100' : 'bg-transparent'
        } border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 text-gray-700 text-sm font-semibold py-2 px-4 rounded-l-none rounded-md`}
      >
        <span className="mr-2">Show</span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            amountOfRecords === 32
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          32
        </span>
      </button>
    </div>
  );
};

export default Switcher;
