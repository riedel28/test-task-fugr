import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { labels } from './Form';

const headings = ['id', 'firstName', 'lastName', 'email', 'phone'];

export const TableHead = ({
  sortBy,
  sortingDirection,
  changeSortDirection,
}) => {
  const [selected, setSelected] = useState('');

  const showSortingSymbol = (name) => {
    if (!sortingDirection) {
      return '--';
    }

    if (selected === name) {
      return sortingDirection === 'desc' ? (
        <span>&#8593;</span>
      ) : (
        <span>&#8595;</span>
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
              sortBy(name, sortingDirection);
              changeSortDirection((prevDirection) =>
                prevDirection === 'asc' ? 'desc' : 'asc'
              );
              setSelected(name);
            }}
            className="border text-gray-800 font-semibold px-4 py-2 hover:bg-gray-300 cursor-pointer"
          >
            {labels[name]}&nbsp;
            {showSortingSymbol(name)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const Table = ({
  children,
  error,
  onSort,
  onChangeSortDirection,
  sortingDirection,
}) => {
  return !error ? (
    <table className="table-auto w-full border mb-4 rounded">
      <TableHead
        sortBy={onSort}
        sortingDirection={sortingDirection}
        changeSortDirection={onChangeSortDirection}
      />
      {children}
    </table>
  ) : (
    <ErrorMessage text={error} />
  );
};

export default Table;
