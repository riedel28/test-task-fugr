import React, { useState } from 'react';

import { labels } from '../Form/Form';

const headings = ['id', 'firstName', 'lastName', 'email', 'phone'];

const TableHead = ({ onSort, sortDirection, onChangeSortDirection }) => {
  const [selected, setSelected] = useState('');

  const showSortingSymbol = (name) => {
    if (!sortDirection) {
      return '--';
    }

    if (selected === name) {
      return sortDirection === 'desc' ? (
        <span>&#8595;</span>
      ) : (
        <span>&#8593;</span>
      );
    }
  };

  return (
    <thead>
      <tr>
        {headings.map((name) => (
          <th
            key={name}
            onClick={() => {
              onSort(name);
              onChangeSortDirection((prevDirection) =>
                prevDirection === 'asc' ? 'desc' : 'asc'
              );
              setSelected(name);
            }}
            className="border text-gray-800 font-semibold px-4 py-2 hover:bg-gray-300 cursor-pointer"
            data-testid={`table-head-${name}`}
          >
            {labels[name]}&nbsp;
            {showSortingSymbol(name)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
