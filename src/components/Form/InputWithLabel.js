import React from 'react';

export const Label = ({ htmlFor, label }) => {
  return (
    <label
      className="block uppercase text-xs text-gray-800 font-bold mb-1"
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
      className={`text-gray-700 border border-gray-300 appearance-none mr-1 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 rounded ${
        error ? 'border-pink-600' : 'border-gray-300'
      }`}
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
    <div className="flex flex-col" style={{ width: '186px' }}>
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
      {error && (
        <span className=" text-pink-600 text-sm font-bold">{error}</span>
      )}
    </div>
  );
};

export default InputWithLabel;
