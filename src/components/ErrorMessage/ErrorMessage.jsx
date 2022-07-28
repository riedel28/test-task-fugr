import React from 'react';

import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ error }) => {
  return (
    error && (
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>An error occured.</h2>
        <h2 className={styles.heading}>Can't get the data</h2>
      </div>
    )
  );
};

export default ErrorMessage;
