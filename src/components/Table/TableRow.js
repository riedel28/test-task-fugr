import React from 'react';

const TableRow = ({ classname, children, ...rest }) => {
  return (
    <tr className="hover:bg-gray-300 cursor-pointer" {...rest}>
      {children}
    </tr>
  );
};

export default TableRow;
