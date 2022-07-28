import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import styles from './UsersModal.module.css';

const UserModal = ({ open, onClose, user }) => {
  const {
    firstName,
    lastName,
    description,
    address: { streetAddress, city, state, zip },
  } = user || {
    firstName: '',
    lastName: '',
    description: '',
    address: {
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
    },
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className={styles.dialog} onClose={onClose}>
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
              <div className={styles.contentWrapper}>
                <div className={styles.inner}>
                  <Dialog.Title as="h3" className={styles.title}>
                    Выбран пользователь
                  </Dialog.Title>
                  <div className={styles.name}>
                    {firstName}&nbsp;{lastName}
                  </div>

                  <div className={styles.content}>
                    <div className={styles.definitionListWrapper}>
                      <dl className={styles.definitionList}>
                        <div className={styles.descriptionWrapper}>
                          <dt className={styles.label}>Описание</dt>
                          <dd className={styles.description}>{description}</dd>
                        </div>
                        <div className={styles.row}>
                          <div className={styles.col}>
                            <dt className={styles.definitionTerm}>Улица</dt>
                            <dd className={styles.definitionDetail}>
                              {streetAddress}
                            </dd>
                          </div>
                          <div className={styles.col}>
                            <dt className={styles.definitionTerm}>Индекс</dt>
                            <dd className={styles.definitionDetail}>{zip}</dd>
                          </div>
                        </div>
                        <div className={styles.row}>
                          <div className={styles.col}>
                            <dt className={styles.definitionTerm}>Город</dt>
                            <dd className={styles.definitionDetail}>{city}</dd>
                          </div>
                          <div className={styles.col}>
                            <dt className={styles.definitionTerm}>Штат</dt>
                            <dd className={styles.definitionDetail}>{state}</dd>
                          </div>
                        </div>
                      </dl>
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

export default UserModal;
