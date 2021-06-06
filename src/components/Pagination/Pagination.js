import React from 'react';

const Pagination = ({
  totalPagesCount,
  currentPage,
  pageOptions,
  goToPage,
  goToNextPage,
  goToPrevPage,
  canNextPage,
  canPrevPage,
}) => {
  const handlePaginate = (e) => {
    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;

    goToPage(pageNumber);
  };

  return (
    <div className="flex items-stretch">
      <button
        className={`px-4 py-2 mr-2 border border-gray-300 rounded disabled:opacity-100`}
        onClick={() => goToPage(0)}
        disabled={!canPrevPage}
      >
        Go to first
      </button>
      <button
        className={`px-4 py-2 border border-gray-300 rounded`}
        onClick={goToPrevPage}
        disabled={!canPrevPage}
      >
        ←
      </button>
      <div className="mx-2 flex items-center">
        <input
          type="number"
          value={currentPage + 1}
          onChange={handlePaginate}
          className="text-gray-700 border border-gray-300 w-20 appearance-none mr-1 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500 rounded"
        />{' '}
        <span className="ml-1">of {pageOptions.length}</span>
      </div>
      <button
        className={`px-4 py-2 mr-2 border border-gray-300 rounded`}
        onClick={goToNextPage}
        disabled={!canNextPage}
      >
        →
      </button>
      <button
        className={`px-4 py-2 mr-2 border border-gray-300 rounded`}
        onClick={() => goToPage(totalPagesCount - 1)}
        disabled={!canNextPage}
      >
        Go to last
      </button>
    </div>
  );
};

export default Pagination;
