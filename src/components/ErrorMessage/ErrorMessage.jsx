import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    error && (
      <div className="text-center border-none py-6">
        <h2 className="font-semibold text-gray-800 text-xl">
          An error occured.
        </h2>
        <h2 className="font-semibold text-gray-800 text-xl">
          Can't get the data
        </h2>
      </div>
    )
  );
};

export default ErrorMessage;
