import React, { useState } from 'react';

import Button from './Button';

export const labels = {
  id: 'Id',
  firstName: 'Имя',
  lastName: 'Фамилия',
  email: 'Электронная почта',
  phone: 'Телефон',
};

const Form = ({ onAddItem }) => {
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formValues);
  };

  return (
    <div>
      <div className="">
        <Button onClick={() => setShowForm(!showForm)}>
          {!showForm ? 'Добавить в таблицу' : 'Закрыть форму'}
        </Button>
      </div>
      <div className="flex justify-center">
        {showForm && (
          <form class="w-full max-w-sm m-4" onSubmit={handleSubmit}>
            {Object.keys(formValues).map((field) => (
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-800 font-semibold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    {labels[field]}
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="text-gray-700 border border-gray-300 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 rounded"
                    id="inline-full-name"
                    type="text"
                    name={field}
                    value={formValues[field]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
            <div class="md:flex md:items-center">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button
                  class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold focus:outline-none py-2 px-4 rounded"
                  type="submit"
                >
                  Добавить пользователя
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Form;
