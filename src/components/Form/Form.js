import React, { useState } from 'react';

import Button from '../Button';
import { isObjEmpty, isEmailValid } from '../../helpers';

export const labels = {
  id: 'Id',
  firstName: 'Имя',
  lastName: 'Фамилия',
  email: 'Электронная почта',
  phone: 'Телефон',
};

const Form = ({ onAddItem }) => {
  const [showForm, setShowForm] = useState(false);
  const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const errors = {};

    if (!values.id) {
      errors.id = 'Введите id';
    } else if (values.id < 0) {
      errors.id = 'Id не должен быть отрицательным числом';
    }

    if (!values.firstName) {
      errors.firstName = 'Введите имя';
    }

    if (!values.lastName) {
      errors.lastName = 'Введите фамилию';
    }

    if (!values.email) {
      errors.email = 'Введите электронную почту';
    } else if (!isEmailValid(values.email)) {
      errors.email = 'Введите валидный email';
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(formValues);
    setErrors(errors);

    if (isObjEmpty(errors)) {
      onAddItem(formValues);
      setFormValues(initialState);
      setShowForm(false);
    }
  };

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setErrors({});
          }}
        >
          {!showForm ? 'Добавить в таблицу' : 'Закрыть форму'}
        </Button>
      </div>
      <div className="flex justify-center">
        {showForm && (
          <form
            className="w-full max-w-sm m-4 flex flex-col items-center"
            onSubmit={handleSubmit}
            noValidate
            data-testid="form"
          >
            {Object.keys(formValues).map((field) => (
              <div className="w-2/3" key={field}>
                <div className="mb-4 flex flex-col">
                  <div className="">
                    <label
                      className="block uppercase text-xs text-gray-800 font-bold mb-1"
                      htmlFor={field}
                    >
                      {labels[field]}
                    </label>
                  </div>

                  <div>
                    <input
                      className="text-gray-700 border border-gray-300 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 rounded"
                      id={field}
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formValues[field]}
                      onChange={handleChange}
                      data-testid={`input-${field}`}
                    />
                    {errors[field] && (
                      <span className=" text-pink-700 text-sm">
                        {errors[field]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="md:flex md:items-center">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold focus:outline-none py-2 px-4 rounded"
                type="submit"
                data-testid="add-user-button"
              >
                Добавить пользователя
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Form;
