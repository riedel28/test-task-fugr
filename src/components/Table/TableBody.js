import React from 'react';

import TableRow from '../Table/TableRow';

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

export default TableBody;
