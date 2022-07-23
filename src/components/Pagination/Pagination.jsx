import React from 'react';

const Pagination = ({
  totalPagesCount,
  goToNextPage,
  goToPrevPage,
  canNextPage,
  canPrevPage,
}) => {
  return (
    <nav
      className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
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
        <button
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={goToPrevPage}
          disabled={!canPrevPage}
        >
          Previous
        </button>
        <button
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
