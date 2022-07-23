import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';

const Filter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter(searchTerm);
  };

  return (
    <form
      className="flex flex-row flex-1 justify-end "
      onSubmit={handleSubmit}
      data-testid="filter"
    >
      <div className="w-2/6">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="mt-1 flex rounded-md">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              type="text"
              name="search"
              id="search"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-4 sm:text-sm border border-gray-300 outline-none"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Filter;
