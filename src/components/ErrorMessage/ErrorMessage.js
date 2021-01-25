import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    error && (
      <div className="text-center border-none py-6">
        <h2 className="font-semibold text-gray-800 text-xl">
          Произошла ошибка.
        </h2>
        <h2 className="font-semibold text-gray-800 text-xl">
          Не удалось загрузить данные
        </h2>
      </div>
    )
  );
};

export default ErrorMessage;
