import React, { useState } from 'react';

const Filter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(searchTerm);
  };

  return (
    <form className="w-2/3 my-2 flex flex-row mb-4" onSubmit={handleSubmit}>
      <input
        className="appearance-none w-1/2 block mr-2 bg-blue-100 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-password"
        type="text"
        placeholder="Фильтр по таблице"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">
        Найти
      </button>
    </form>
  );
};

export default Filter;
