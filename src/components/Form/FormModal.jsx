import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import Field from './Field';
import Button from '../Button/Button';
import { isObjEmpty, isEmailValid } from '../../helpers';

import styles from './FormModal.module.css';

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
      <Dialog as="div" className={styles.dialog} onClose={() => onClose(false)}>
        <div className={styles.wrapper}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={styles.overlay} />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className={styles.centered} aria-hidden="true">
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
            <div className={styles.body}>
              <div className={styles.buttonWrapper}>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => onClose(false)}
                >
                  <span className={styles.hiddenLabel}>Close</span>
                  <XIcon className={styles.buttonIcon} aria-hidden="true" />
                </button>
              </div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <Dialog.Title as="h3" className={styles.title}>
                    Add user
                  </Dialog.Title>

                  <div className={styles.formWrapper}>
                    <form noValidate data-testid="form" onSubmit={handleSubmit}>
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

                      <div className={styles.formFooter}>
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
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Form;
