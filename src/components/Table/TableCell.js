import React from 'react';

const TableCell = ({ children, ...rest }) => {
  return (
    <td className="border px-4 py-2" {...rest}>
      {children}
    </td>
  );
};

export default TableCell;
