import React, { useState } from 'react';

import InputWithLabel from './InputWithLabel';
import Button from '../Button/Button';
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
      <div className="mb-3">
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setErrors({});
          }}
          testId="form-open-button"
        >
          {!showForm ? 'Добавить в таблицу' : 'Закрыть форму'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} noValidate data-testid="form">
          <div className="flex flex-row mb-2">
            {Object.keys(formValues).map((field) => (
              <InputWithLabel
                key={field}
                id={field}
                label={labels[field]}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formValues[field]}
                onChange={handleChange}
                error={errors[field]}
                testId={`input-${field}`}
              />
            ))}
          </div>
          <div className="flex flex-row w-full justify-end">
            <Button testId="add-user-button">Добавить</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
