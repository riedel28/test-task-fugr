import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import './styles/main.css';

import Body from './components/Body';
import Container from './components/Container';
import Header from './components/Header';
import Form from './components/Form';
import Switcher from './components/Switcher';
import Filter from './components/Filter';
import Preloader from './components/Preloader';
import Table, { TableBody } from './components/Table';
import Row from './components/Row';
import InfoCard from './components/InfoCard';
import Pagination from './components/Pagination';

import { getUrl } from './api';

function App() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [isLoading, setLoading] = useState(false);

  const [showRows, setShowRows] = useState('less');

  const [sortingDirection, setSortingDirection] = useState(null);

  // const [currentPosts, setCurrentPosts] = useState([]);

  const sortBy = (key, direction) => {
    const sortedList =
      direction === 'asc'
        ? _.sortBy(filteredList, [key])
        : _.sortBy(filteredList, [key]).reverse();

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

    console.log(searchTerm);

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
      setError('Ничего не найдено');
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

    console.log('indexOfFirstItem', indexOfFirstItem);
    console.log('indexOfLastItem', indexOfLastItem);
    console.log('currentPosts', currentPosts);

    return currentPosts;
  };

  const currentPosts = displayPostsPerPage(list, currentPage, itemsPerPage);

  // useEffect(() => {
  //   setCurrentPosts(
  //     displayPostsPerPage(filteredList, currentPage, itemsPerPage)
  //   );
  // }, [filteredList]);

  const displayTableRows = currentPosts.map((person, index) => {
    return (
      <Row
        key={`${person.id}${index}`}
        {...person}
        onSelect={handleSelectUser}
      />
    );
  });

  console.log('currentPosts', currentPosts);
  console.log('filteredList', filteredList);
  console.log(filteredList.length);

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

        {isLoading ? (
          <Preloader />
        ) : (
          <Table
            onSort={sortBy}
            sortingDirection={sortingDirection}
            onChangeSortDirection={setSortingDirection}
            error={error}
          >
            <TableBody>{displayTableRows}</TableBody>
          </Table>
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
