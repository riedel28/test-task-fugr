import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter(searchTerm);
  };

  return (
    <form
      className="flex flex-row flex-1 justify-end"
      onSubmit={handleSubmit}
      data-testid="filter"
    >
      <input
        className="appearance-none w-1/2 block mr-2 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-password"
        type="text"
        placeholder="Фильтр по таблице"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        data-testid="filter-input"
      />

      <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
        Найти
      </button>
    </form>
  );
};

export default Filter;
