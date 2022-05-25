import React from 'react';

const TableHead = ({ children, ...rest }) => {
  return (
    <thead className="bg-gray-50" {...rest}>
      {children}
    </thead>
  );
};

export default TableHead;
