import React from 'react';
import { displayUsersFoundMessage } from '../../helpers';

import styles from './UsersFound.module.css';

const UsersFound = ({ count }) => {
  return <p className={styles.text}>{displayUsersFoundMessage(count)}</p>;
};

export default UsersFound;
