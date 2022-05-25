import React from 'react';

const Container = ({ children }) => {
  return <div className="md:container md:mx-auto px-4 py-2">{children}</div>;
};

export default Container;
