import React from "react";

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
          Выбран пользователь:{" "}
          <b>
            {firstName}&nbsp;{lastName}
          </b>
        </div>
        <div className="mb-2">
          <p>Описание:</p>
          <textarea
            onChange={() => {}}
            className="p-2 rounded border bg-blue-100 w-2/3"
            rows="8"
            value={description}
          />
        </div>
        <div className="mb-2">
          Адрес проживания: <b>{streetAddress}</b>
        </div>
        <div className="mb-2">
          Город: <b>{city}</b>
        </div>
        <div className="mb-2">
          Провинция/штат: <b>{state}</b>
        </div>
        <div className="mb-2">
          Индекс: <b>{zip}</b>
        </div>
      </div>
      <div className="">
        <button
          onClick={onClose}
          class="bg-transparent block ml-auto hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
