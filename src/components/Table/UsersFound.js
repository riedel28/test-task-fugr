import React from 'react';
import { displayUsersFoundMessage } from '../../helpers';

const UsersFound = ({ count }) => {
  return (
    <p className="my-4 font-semibold text-gray-800 text-lg">
      {displayUsersFoundMessage(count)}
    </p>
  );
};

export default UsersFound;
