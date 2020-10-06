import React, { useState } from 'react';

import { labels } from '../Form/Form';

const headings = ['id', 'firstName', 'lastName', 'email', 'phone'];

const TableHead = ({ sortBy, sortingDirection, changeSortDirection }) => {
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

const TableRow = ({ id, firstName, lastName, email, phone, onSelectRow }) => {
  const onSelectItem = () => {
    onSelectRow({ id, firstName, lastName, email, phone });
  };

  return (
    <tr onClick={onSelectItem} className="hover:bg-gray-300 cursor-pointer">
      <td className="border px-4 py-2">{id}</td>
      <td className="border px-4 py-2">{firstName}</td>
      <td className="border px-4 py-2">{lastName}</td>
      <td className="border px-4 py-2">{email.toLowerCase()}</td>
      <td className="border px-4 py-2">{phone}</td>
    </tr>
  );
};

const TableBody = ({ data, onSelectRow }) => {
  const displayTableRows = data.map((person, index) => {
    return (
      <TableRow
        key={`${person.id}${index}`}
        {...person}
        onSelectRow={onSelectRow}
      />
    );
  });

  return <tbody data-testid="table-body">{displayTableRows}</tbody>;
};

const Table = ({
  data,
  onSort,
  onChangeSortDirection,
  sortingDirection,
  onSelectRow,
}) => {
  return (
    <table
      className="table-auto w-full border mb-4 rounded"
      data-testid="table"
    >
      <TableHead
        sortBy={onSort}
        sortingDirection={sortingDirection}
        changeSortDirection={onChangeSortDirection}
      />
      <TableBody data={data} onSelectRow={onSelectRow} />
    </table>
  );
};

export default Table;
