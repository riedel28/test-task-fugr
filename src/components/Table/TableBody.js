import React from 'react';

const TableBody = ({ children, ...rest }) => {
  return (
    <tbody data-testid="table-body" {...rest}>
      {children}
    </tbody>
  );
};

export default TableBody;
