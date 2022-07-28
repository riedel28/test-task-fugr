import React from 'react';
import cx from 'clsx';

import styles from './Pagination.module.css';

const Pagination = ({
  totalPagesCount,
  goToNextPage,
  goToPrevPage,
  canNextPage,
  canPrevPage,
}) => {
  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <div className={styles.wrapper}>
        <p className={styles.results}>
          Showing <span className={styles.bold}>1</span> to{' '}
          <span className={styles.bold}>10</span> of{' '}
          <span className={styles.bold}>{totalPagesCount}</span> results
        </p>
      </div>
      <div className={styles.controls}>
        <button
          className={cx(styles.button, styles.prev)}
          onClick={goToPrevPage}
          disabled={!canPrevPage}
        >
          Previous
        </button>
        <button
          className={styles.button}
          onClick={goToNextPage}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
