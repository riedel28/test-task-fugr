import React from 'react';
import { Bars as Loader } from 'react-loader-spinner';

import styles from './Preloader.module.css';

const Spinner = () => {
  return (
    <div className={styles.wrapper} data-testid="preloader">
      <Loader
        type="TailSpin"
        color="#667eea"
        height={50}
        width={50}
        timeout={3000}
      />
    </div>
  );
};

export default Spinner;
