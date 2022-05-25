import React, { useState, useEffect, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';

import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCell from './TableCell';
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
          <>
            {page.length < 1 ? (
              <div className="text-center border-none py-6">
                <h2 className="font-semibold text-gray-800 text-xl">
                  Could not find anything
                </h2>
                <p>Try again.</p>
              </div>
            ) : (
              <div className="mt-3 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden ring-1 ring-black ring-opacity-5 md:rounded-md">
                      <table
                        className="table-auto w-full  mb-4 rounded-md"
                        data-testid="table"
                        {...getTableProps()}
                      >
                        <thead className="bg-gray-50 border-b-2">
                          {headerGroups.map((headerGroup) => (
                            <tr
                              {...headerGroup.getHeaderGroupProps()}
                              data-testid="table-head-id"
                            >
                              {headerGroup.headers.map((column) => (
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold hover:bg-gray-100 text-gray-700 sm:pl-6"
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
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

                        <tbody
                          className="divide-y divide-gray-200 bg-white"
                          {...getTableBodyProps()}
                        >
                          {page.map((row) => {
                            prepareRow(row);
                            return (
                              <tr
                                className="hover:bg-gray-50 hover:cursor-pointer"
                                {...row.getRowProps({
                                  onClick: (e) =>
                                    handleSelectUser &&
                                    handleSelectUser(row.original, e),
                                })}
                              >
                                {row.cells.map((cell) => {
                                  return (
                                    <td
                                      className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
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
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      case 'rejected':
        return <ErrorMessage error={error} />;
      default:
        throw new Error(`Unhandled status: ${status}`);
    }
  };

  return (
    <>
      <div className="flex w-full justify-between mb-1">
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
