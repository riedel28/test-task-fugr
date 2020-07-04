import React from "react";

export default function InfoCard({ user }) {
  const {
    firstName,
    lastName,
    description,
    address: { streetAddress, city, state, zip },
  } = user;

  return (
    <div className="w-1/2 border px-4 py-4 rounded mb-4">
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
  );
}
