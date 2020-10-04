import React, { useState, useEffect } from 'react';
import sortBy from 'lodash.sortby';

import './styles/main.css';

import Body from './components/Body';
import Container from './components/Container';
import Header from './components/Header';
import Form from './components/Form/Form';
import Switcher from './components/Switcher';
import Filter from './components/Filter';
import Preloader from './components/Preloader';
import Table from './components/Table/Table';
import ErrorMessage from './components/ErrorMessage';
import InfoCard from './components/InfoCard';
import Pagination from './components/Pagination';

import { getUrl } from './api';

function App() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [isLoading, setLoading] = useState(false);

  const [showRows, setShowRows] = useState('less');

  const [sortingDirection, setSortingDirection] = useState(null);

  const handleSort = (key, direction) => {
    const sortedList =
      direction === 'asc'
        ? sortBy(filteredList, [key])
        : sortBy(filteredList, [key]).reverse();

    setFilteredList(sortedList);
  };

  const fetchData = async (url) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setList(data);
      setFilteredList(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    const url = getUrl(showRows);

    fetchData(url);
    setSelectedUser(null);
  }, [showRows]);

  useEffect(() => {
    if (selectedUser) {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [selectedUser]);

  const handleSelectUser = (user) => {
    const foundUser = list.find(({ id }) => id === user.id);

    setSelectedUser(foundUser);
  };

  const handleAddUser = (user) => {
    setFilteredList((prevState) => [user, ...prevState]);
  };

  const handleSearch = (searchTerm) => {
    setError(null);
    setSelectedUser(null);

    const filteredUsers = list.filter((user) => {
      return (
        user.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    if (filteredUsers.length === 0) {
      setError('Ничего не найдено. Попробуйте повторить поиск');
    }

    setFilteredList(filteredUsers);
    setSortingDirection(null);
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

  const currentPosts =
    filteredList.length < itemsPerPage
      ? filteredList
      : displayPostsPerPage(list, currentPage, itemsPerPage);

  return (
    <Body>
      <Container>
        <Header>
          <div className="mb-4">
            <Form onAddItem={handleAddUser} />
          </div>
          <div className="flex mb-2">
            <Switcher onSelect={setShowRows} rowsToShow={showRows} />
            <Filter onSearch={handleSearch} />
          </div>
        </Header>

        {isLoading && <Preloader />}

        {!error && !isLoading ? (
          <Table
            data={currentPosts}
            onSort={handleSort}
            sortingDirection={sortingDirection}
            onChangeSortDirection={setSortingDirection}
            onSelectRow={handleSelectUser}
          />
        ) : (
          <ErrorMessage text={error} />
        )}

        {selectedUser && (
          <InfoCard user={selectedUser} onClose={handleHideInfoCard} />
        )}

        {showRows === 'more' && !isLoading && (
          <Pagination
            total={filteredList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePaginate}
          />
        )}
      </Container>
    </Body>
  );
}

export default App;
