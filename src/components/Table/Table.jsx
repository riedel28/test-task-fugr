import React, { useState, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import cx from 'clsx';

import Switcher from '../Switcher/Switcher';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import Preloader from '../Preloader/Preloader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import UserModal from './UserModal';

import styles from './Table.module.css';

const Table = ({
  data: tableData,
  setAmountOfRecords,
  amountOfRecords,
  status,
  error,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(true);

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

  const handleSelectUser = (user) => {
    setSelectedUser(tableData.find(({ id }) => id === user.id));
    setOpen(true);
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
              <div className={styles.notFound}>
                <h2 className={styles.notFoundTitle}>
                  Could not find anything
                </h2>
                <p>Try again.</p>
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <div className={styles.overflowWrapper}>
                  <table
                    className={styles.table}
                    data-testid="table"
                    {...getTableProps()}
                  >
                    <thead className={styles.thead}>
                      {headerGroups.map((headerGroup) => (
                        <tr
                          {...headerGroup.getHeaderGroupProps()}
                          data-testid="table-head-id"
                        >
                          {headerGroup.headers.map((column) => (
                            <th
                              scope="col"
                              className={styles.th}
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
                      className={styles.tbody}
                      data-testid="table-body"
                      {...getTableBodyProps()}
                    >
                      {page.map((row) => {
                        prepareRow(row);
                        const isSelected = row.original.id === selectedUser?.id;
                        return (
                          <tr
                            className={cx(styles.tr, {
                              [styles.active]: isSelected,
                            })}
                            {...row.getRowProps({
                              onClick: (e) =>
                                handleSelectUser &&
                                handleSelectUser(row.original, e),
                            })}
                          >
                            {row.cells.map((cell) => {
                              const isName =
                                cell.column.id === 'firstName' ||
                                cell.column.id === 'lastName';
                              return (
                                <td
                                  className={cx(styles.td, {
                                    [styles.selected]: isName,
                                  })}
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
      <div className={styles.contentWrapper}>
        <Switcher
          onSelect={setAmountOfRecords}
          amountOfRecords={amountOfRecords}
        />
        <Filter onFilter={setGlobalFilter} />
      </div>
      {selectedUser && (
        <UserModal open={open} onClose={setOpen} user={selectedUser} />
      )}
      {displayTable()}
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
