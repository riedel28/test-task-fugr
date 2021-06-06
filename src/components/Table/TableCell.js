import React from 'react';

const TableCell = ({ classname, children, ...rest }) => {
  return (
    <td className={classname} {...rest}>
      {children}
    </td>
  );
};

export default TableCell;
