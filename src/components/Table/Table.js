import React, { useState, useEffect } from 'react';

import Switcher from '../Switcher/Switcher';
import Filter from '../Filter/Filter';
import TableHead from '../Table/TableHead';
import TableBody from '../Table/TableBody';
import InfoCard from '../InfoCard/InfoCard';
import Pagination from '../Pagination/Pagination';
import Preloader from '../Preloader/Preloader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import UsersFound from './UsersFound';

const Table = ({ data, setShowRows, showRows, isLoading, status, error }) => {
  const [filterTerm, setFilterTerm] = useState('');

  const [sortProperty, setSortProperty] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchStarted, setSearchStarted] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [selectedUser]);

  const handleFilter = (searchTerm) => {
    setSelectedUser(null);

    if (searchTerm === '') {
      setSearchStarted(false);
    } else {
      setSearchStarted(true);
    }

    setFilterTerm(searchTerm);
  };

  const filterItems = (user) => {
    return (
      user.id.toString().toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(filterTerm.toLowerCase())
    );
  };

  const sortItems = (item1, item2) => {
    let result = 0;

    if (item1[sortProperty] > item2[sortProperty]) {
      result = -1;
    }

    if (item1[sortProperty] < item2[sortProperty]) {
      result = 1;
    }

    return sortDirection === 'asc' ? result * -1 : result;
  };

  const handleSelectUser = (user) => {
    const foundUser = data.find(({ id }) => id === user.id);

    setSelectedUser(foundUser);
  };

  const handleHideInfoCard = () => {
    setSelectedUser(null);
  };

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayPostsPerPage = (itemsList, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPosts = itemsList.slice(indexOfFirstItem, indexOfLastItem);

    return currentPosts;
  };

  const filteredList = data.filter(filterItems).sort(sortItems);
  const currentPosts =
    filteredList.length < itemsPerPage
      ? filteredList
      : displayPostsPerPage(filteredList, currentPage, itemsPerPage);

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
          >
            <TableHead
              onSort={setSortProperty}
              sortDirection={sortDirection}
              onChangeSortDirection={setSortDirection}
            />
            <TableBody data={currentPosts} onSelectRow={handleSelectUser} />
          </table>
        );
      case 'rejected':
        return <ErrorMessage text={error.message} />;
      default:
        throw new Error('This should be impossible');
    }
  };

  return (
    <>
      <div className="flex w-full justify-between mb-2">
        <Switcher onSelect={setShowRows} rowsToShow={showRows} />
        <Filter onFilter={handleFilter} />
      </div>
      {searchStarted && <UsersFound count={filteredList.length} />}
      {displayTable()}
      {selectedUser && (
        <InfoCard user={selectedUser} onClose={handleHideInfoCard} />
      )}
      {showRows === 'more' && currentPosts.length > 32 && (
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
