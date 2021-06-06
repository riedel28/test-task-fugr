import React, { useState, useEffect, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';

import Switcher from '../Switcher/Switcher';
import Filter from '../Filter/Filter';
import InfoCard from '../InfoCard/InfoCard';
import Pagination from '../Pagination/Pagination';
import Preloader from '../Preloader/Preloader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Table = ({
  data: tableData,
  setAmountOfRecords,
  amountOfRecords,
  status,
  error,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const data = useMemo(() => tableData, [tableData]);

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'First name',
        accessor: 'firstName',
      },
      {
        Header: 'Last name',
        accessor: 'lastName',
      },

      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    pageOptions,
    state: { pageIndex },
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    { columns, data, initialState: { pageSize: 32 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (selectedUser) {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [selectedUser]);

  const handleSelectUser = (user) => {
    setSelectedUser(tableData.find(({ id }) => id === user.id));
  };

  const handleHideInfoCard = () => {
    setSelectedUser(null);
  };

  const displayTable = () => {
    switch (status) {
      case 'idle':
        return <Preloader />;

      case 'loading':
        return <Preloader />;

      case 'resolved':
        return (
          <table
            className="table-auto w-full border mb-4 rounded"
            data-testid="table"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="border text-gray-800 font-semibold px-4 py-2 hover:bg-gray-300 cursor-pointer"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' ↑'
                            : ' ↓'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className="hover:bg-gray-300 cursor-pointer"
                    onClick={handleSelectUser}
                    {...row.getRowProps({
                      onClick: (e) =>
                        handleSelectUser && handleSelectUser(row.original, e),
                    })}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="border px-4 py-2"
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      case 'rejected':
        return <ErrorMessage error={error} />;
      default:
        throw new Error(`Unhandled status: ${status}`);
    }
  };

  return (
    <>
      <div className="flex w-full justify-between mb-2">
        <Switcher
          onSelect={setAmountOfRecords}
          amountOfRecords={amountOfRecords}
        />
        <Filter onFilter={setGlobalFilter} />
      </div>
      {displayTable()}
      {selectedUser && (
        <InfoCard user={selectedUser} onClose={handleHideInfoCard} />
      )}
      {pageOptions.length > 1 && (
        <Pagination
          totalPagesCount={pageCount}
          currentPage={pageIndex}
          pageOptions={pageOptions}
          goToPrevPage={() => previousPage()}
          goToNextPage={() => nextPage()}
          goToPage={gotoPage}
          canPrevPage={canPreviousPage}
          canNextPage={canNextPage}
        />
      )}
    </>
  );
};

export default Table;
