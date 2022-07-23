import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

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
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
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
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-md leading-6 font-semibold text-gray-500 mb-3"
                  >
                    Выбран пользователь
                  </Dialog.Title>
                  <div className="mt-6 text-lg text-gray-700 font-semibold">
                    {firstName}&nbsp;{lastName}
                  </div>
                  <div className="mt-1">
                    <div className="bg-white overflow-hidden sm:rounded-md">
                      <div className="py-5 sm:p-0">
                        <dl className="">
                          <div className="py-4">
                            <dt className="text-sm font-medium text-gray-500 mb-1">
                              Описание
                            </dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:mt-0 ">
                              {description}
                            </dd>
                          </div>
                          <div className="flex">
                            <div className="py-4 w-1/2">
                              <dt className="text-sm font-medium text-gray-500 mb-1">
                                Улица
                              </dt>
                              <dd className="mt-1 text-sm text-gray-700 sm:mt-0 ">
                                {streetAddress}
                              </dd>
                            </div>
                            <div className="py-4 w-1/2">
                              <dt className="text-sm font-medium text-gray-500 mb-1">
                                Индекс
                              </dt>
                              <dd className="mt-1 text-sm text-gray-700 sm:mt-0 ">
                                {zip}
                              </dd>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="py-4 w-1/2 sm:py-5 ">
                              <dt className="text-sm font-medium text-gray-500 mb-1">
                                Город
                              </dt>
                              <dd className="mt-1 text-sm text-gray-700 sm:mt-0 ">
                                {city}
                              </dd>
                            </div>
                            <div className="py-4 w-1/2 sm:py-5 ">
                              <dt className="text-sm font-medium text-gray-500 mb-1">
                                Штат
                              </dt>
                              <dd className="mt-1 text-sm text-gray-700 sm:mt-0 ">
                                {state}
                              </dd>
                            </div>
                          </div>
                        </dl>
                      </div>
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
