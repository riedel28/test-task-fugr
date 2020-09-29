import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="container mx-auto flex items-center flex-col px-4 py-6">
      {children}
    </div>
  );
};

export default Container;
