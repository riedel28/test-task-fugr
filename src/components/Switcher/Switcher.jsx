import React from 'react';
import cx from 'clsx';

import styles from './Switcher.module.css';

const Switcher = ({ onSelect, amountOfRecords }) => {
  return (
    <div className="" data-testid="switcher">
      <button
        onClick={() => {
          onSelect(1000);
        }}
        className={cx(styles.button, styles.left, {
          [styles.active]: amountOfRecords === 1000,
        })}
      >
        <span className={styles.label}>Show</span>
        <span
          className={cx(styles.tag, {
            [styles.active]: amountOfRecords === 1000,
          })}
        >
          1000
        </span>
      </button>
      <button
        onClick={() => {
          onSelect(32);
        }}
        className={cx(styles.button, styles.right, {
          [styles.active]: amountOfRecords === 32,
        })}
      >
        <span className={styles.label}>Show</span>
        <span
          className={cx(styles.tag, {
            [styles.active]: amountOfRecords === 32,
          })}
        >
          32
        </span>
      </button>
    </div>
  );
};

export default Switcher;
