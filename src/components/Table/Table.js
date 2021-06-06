import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

import Switcher from '../Switcher/Switcher';
import Filter from '../Filter/Filter';
import InfoCard from '../InfoCard/InfoCard';
import Pagination from '../Pagination/Pagination';
import Preloader from '../Preloader/Preloader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Table = ({ data: tableData, setShowRows, showRows, status, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

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
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

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

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              {rows.map((row) => {
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
        <Switcher onSelect={setShowRows} rowsToShow={showRows} />
        <Filter onFilter={setGlobalFilter} />
      </div>
      {displayTable()}
      {selectedUser && (
        <InfoCard user={selectedUser} onClose={handleHideInfoCard} />
      )}
      {showRows === 'more' && (
        <Pagination
          total={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePaginate}
        />
      )}
    </>
  );
};

export default Table;
