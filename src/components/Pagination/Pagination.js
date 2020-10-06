import React from 'react';

const PaginationItem = ({ page, currentPage, paginate }) => {
  const activeClass = currentPage === page ? `bg-gray-300` : ``;

  return (
    <button
      href={`#`}
      className={`px-4 py-2 border border-gray-300 ${activeClass}`}
      onClick={() => {
        paginate(page);
      }}
    >
      {page}
    </button>
  );
};

const range = (start, end) => [...Array(end).keys()].map((el) => el + start);

const Pagination = ({ total, itemsPerPage, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(total / itemsPerPage);
  const pageNumbers = range(1, pagesCount);

  return (
    pageNumbers.length > 1 && (
      <nav className="flex flex-wrap rounded" data-testid="pagination">
        {pageNumbers.map((pageNumber) => {
          return (
            <PaginationItem
              key={pageNumber}
              page={pageNumber}
              currentPage={currentPage}
              paginate={onPageChange}
            />
          );
        })}
      </nav>
    )
  );
};

export default Pagination;
