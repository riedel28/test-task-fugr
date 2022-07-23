import React from 'react';

export const Label = ({ htmlFor, label }) => {
  return (
    <label
      className="text-sm font-medium text-gray-500 mb-1 w-100"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
};

export const Input = ({
  id,
  type,
  name,
  value,
  onChange,
  testId = '',
  placeholder = '',
  error,
}) => {
  return (
    <input
      className={`w-auto text-gray-700 border border-gray-300 appearance-none py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
        error ? 'focus:border-pink-600' : 'focus:border-indigo-500'
      } ${
        error ? 'border-pink-600' : 'border-gray-300'
      } focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md`}
      id={id}
      type={type === 'email' ? 'email' : 'text'}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      data-testid={testId}
    />
  );
};

const InputWithLabel = ({
  id,
  type,
  name,
  label,
  value,
  onChange,
  error,
  testId = '',
}) => {
  return (
    <div className="py-3 flex flex-col">
      <Label htmlFor={id} label={label} />
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        testId={testId}
      />
      {error && <span className=" text-pink-600 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default InputWithLabel;
