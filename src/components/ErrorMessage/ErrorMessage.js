import React from 'react';

const ErrorMessage = ({ text }) => {
  return (
    <div className="text-center border-none py-6">
      <h2 className="font-semibold text-gray-800 text-xl">{text}</h2>
    </div>
  );
};

export default ErrorMessage;
