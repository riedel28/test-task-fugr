import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import Field from './Field';
import Button from '../Button/Button';
import { isObjEmpty, isEmailValid } from '../../helpers';

export const labels = {
  id: 'ID',
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  phone: 'Phone',
};

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const Form = ({ onAddUser, open, onClose }) => {
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
      errors.id = "Id shouldn't be negative";
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
      onAddUser(formValues);
      setFormValues(initialState);
      onClose(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => onClose(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-md px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => onClose(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:mr-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-md leading-6 font-semibold text-gray-500 mb-3"
                  >
                    Add user
                  </Dialog.Title>

                  <div className="mt-1">
                    <div className="bg-white overflow-hidden sm:rounded-md">
                      <form
                        noValidate
                        data-testid="form"
                        onSubmit={handleSubmit}
                      >
                        {Object.keys(formValues).map((field) => (
                          <Field
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

                        <div className="flex flex-row w-full justify-end mt-2">
                          <Button
                            testId="add-user-button"
                            disabled={!allInputsFilled}
                          >
                            Add
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Form;
