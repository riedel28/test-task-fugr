import React from 'react';
import cx from 'clsx';

import styles from './Field.module.css';

export const Label = ({ htmlFor, label }) => {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
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
      className={cx(styles.input, error && styles.inputError)}
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
    <div className={styles.field}>
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
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default InputWithLabel;
