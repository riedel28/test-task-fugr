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
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{' '}
          <span className="font-medium">10</span> of{' '}
          <span className="font-medium">{totalPagesCount}</span> results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <a
          // href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => goToPage(0)}
          disabled={!canPrevPage}
        >
          Previous
        </a>
        <a
          // href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={goToNextPage}
          disabled={!canNextPage}
        >
          Next
        </a>
      </div>
    </nav>
  );

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
