import React, { useState } from 'react';

import InputWithLabel from './InputWithLabel';
import Button from '../Button/Button';
import { isObjEmpty, isEmailValid } from '../../helpers';

export const labels = {
  id: 'Id',
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  phone: 'Phone',
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

  const allInputsFilled = Object.values(formValues).every(
    (value) => value !== ''
  );

  const validate = (values) => {
    const errors = {};

    if (!values.id) {
      errors.id = 'Enter id';
    } else if (values.id < 0) {
      errors.id = "Id shouldn't be nagative";
    }

    if (!values.firstName) {
      errors.firstName = 'Enter a name';
    }

    if (!values.lastName) {
      errors.lastName = 'Enter a last name';
    }

    if (!values.email) {
      errors.email = 'Enter email';
    } else if (!isEmailValid(values.email)) {
      errors.email = 'Enter valid email';
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
          {!showForm ? 'Add to the table' : 'Close form'}
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
            <Button testId="add-user-button" disabled={!allInputsFilled}>
              Add
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
