import React from 'react';

const TableCell = ({ children, ...rest }) => {
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" {...rest}>
      {children}
    </td>
  );
};

export default TableCell;
