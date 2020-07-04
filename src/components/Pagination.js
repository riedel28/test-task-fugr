import React from "react";

const PaginationItem = ({ page, currentPage, paginate }) => {
  const activeClass = currentPage === page ? `bg-blue-200` : ``;

  return (
    <a
      href={`!#`}
      className={`px-4 py-2 border ${activeClass}`}
      onClick={() => {
        paginate(page);
      }}
    >
      {page}
    </a>
  );
};

const range = (start, end) => [...Array(end).keys()].map((el) => el + start);

const Pagination = ({ total, itemsPerPage, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(total / itemsPerPage);
  const pageNumbers = range(1, pagesCount);

  return (
    <nav className="w-2/3 flex flex-row justify-end rounded">
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
  );
};

export default Pagination;
