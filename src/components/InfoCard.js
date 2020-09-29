import React from 'react';

export default function InfoCard({ user, onClose }) {
  const {
    firstName,
    lastName,
    description,
    address: { streetAddress, city, state, zip },
  } = user;

  return (
    <div className="w-1/2 border px-4 py-4 rounded mb-4 flex">
      <div className="flex flex-col flex-1">
        <div className="mb-2">
          <div className="uppercase font-semibold text-gray-800 text-sm">
            Выбран пользователь:
          </div>
          <div className="text-xl py-2">
            {firstName}&nbsp;{lastName}
          </div>
        </div>
        <div className="mb-2">
          <div className="uppercase font-semibold text-gray-800 text-sm">
            Описание
          </div>
          <textarea
            onChange={() => {}}
            className="w-2/3 text-gray-700 border border-gray-300 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 rounded"
            rows="8"
            value={description}
          />
        </div>
        <div className="mb-2">
          <div className="uppercase font-semibold text-gray-800 text-sm">
            Адрес проживания
          </div>
          <div>{streetAddress}</div>
        </div>
        <div className="mb-2">
          <div className="uppercase font-semibold text-gray-800 text-sm">
            Город
          </div>
          <div>{city}</div>
        </div>
        <div className="mb-2">
          <div className="uppercase font-semibold text-gray-800 text-sm">
            Провинция/штат
          </div>
          <div>{state}</div>
        </div>
        <div className="mb-2">
          <div className="uppercase font-semibold text-gray-800 text-sm">
            Индекс
          </div>
          <div>{zip}</div>
        </div>
      </div>
      <div className="">
        <button
          onClick={onClose}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
