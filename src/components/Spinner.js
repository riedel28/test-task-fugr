import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="m-10">
      <Loader
        type="TailSpin"
        color="#2d3748"
        height={50}
        width={50}
        timeout={3000}
      />
    </div>
  );
};

export default Spinner;
