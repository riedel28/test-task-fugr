import React from 'react';

const TableHead = ({ children, ...rest }) => {
  return <thead {...rest}>{children}</thead>;
};

export default TableHead;
