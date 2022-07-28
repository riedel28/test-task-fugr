import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';

import styles from './Filter.module.css';

const Filter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter(searchTerm);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-testid="filter">
      <div className={styles.fieldWrapper}>
        <label htmlFor="search" className={styles.label}>
          Search
        </label>
        <div className={styles.field}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="search"
              id="search"
              className={styles.input}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.button}>
            <SearchIcon className={styles.icon} aria-hidden="true" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Filter;
