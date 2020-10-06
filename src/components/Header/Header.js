import React from 'react';

const Header = ({ children }) => {
  return (
    <div className="w-full m-2 flex flex-col justify-between">{children}</div>
  );
};

export default Header;
