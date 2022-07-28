import React from 'react';

import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'submit', testId, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={styles.btn}
      type={type}
      data-testid={testId}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
