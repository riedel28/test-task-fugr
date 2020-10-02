import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="m-10">
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
