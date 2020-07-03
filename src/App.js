import React from "react";

import "./styles/main.css";

function App() {
  return (
    <div className="min-h-screen bg-blue-100 ">
      <div class="container mx-auto flex justify-center items-center  flex-col p-4">
        <div className="w-2/3 m-2 flex flex-row justify-between">
          <div class="inline-flex">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              Показать много
            </button>
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              Показать мало
            </button>
          </div>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">
            Добавить
          </button>
        </div>
        <div className="w-2/3 my-2 flex flex-row mb-4">
          <input
            class="appearance-none w-1/2 block mr-2 bg-blue-100 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="Фильтр по таблице"
          />

          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">
            Найти
          </button>
        </div>
        <table class="table-auto border w-2/3 mb-4">
          <thead>
            <tr>
              <th class="border px-4 py-2">Id</th>
              <th class="border px-4 py-2">First Name</th>
              <th class="border px-4 py-2">Last Name</th>
              <th class="border px-4 py-2">Email</th>
              <th class="border px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">101</td>
              <td class="border px-4 py-2">Sue</td>
              <td class="border px-4 py-2">Corson</td>
              <td class="border px-4 py-2">dwhalley@in.gov</td>
              <td class="border px-4 py-2">(612)211-6296</td>
            </tr>
          </tbody>
        </table>

        <div className="w-1/2 border px-4 py-4 rounded">
          <div className="mb-2">
            Выбран пользователь: <b>Sue Corson</b>
          </div>
          <div className="mb-2">
            <p>Описание:</p>
            <textarea className="w-2/3 p-2 rounded border bg-blue-100" rows="5">
              et lacus magna dolor...
            </textarea>
          </div>
          <div className="mb-2">
            Адрес проживания: <b>9792 Mattis Ct</b>
          </div>
          <div className="mb-2">
            Город: <b>Waukesha</b>
          </div>
          <div className="mb-2">
            Провинция/штат: <b>WI</b>
          </div>
          <div className="mb-2">
            Индекс: <b>22178</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
