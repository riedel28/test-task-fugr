import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './styles/main.css';
import Table, { TableBody } from './components/Table';
import Row from './components/Row';

import { getUrl } from './api';
import Form from './components/Form';
import Filter from './components/Filter';
import InfoCard from './components/InfoCard';
import Pagination from './components/Pagination';
import Switcher from './components/Switcher';
import Button from './components/Button';
import Body from './components/Body';
import Container from './components/Container';

function App() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [isLoading, setLoading] = useState(false);

  const [showRows, setShowRows] = useState('less');

  const [sortingDirection, setSortingDirection] = useState(null);

  const sortBy = (key, direction) => {
    const sortedList =
      direction === 'asc'
        ? _.sortBy(list, [key])
        : _.sortBy(list, [key]).reverse();

    setList(sortedList);
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
  }, [showRows]);

  const handleSelectUser = (user) => {
    const foundUser = list.find(({ id }) => id === user.id);

    setSelectedUser(foundUser);
  };

  const handleAddUser = (user) => {
    setFilteredList((prevState) => [user, ...prevState]);
    setShowForm(false);
  };

  const handleSearch = (searchTerm) => {
    setError(null);

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

  const displayTableRows = displayPostsPerPage(
    list,
    currentPage,
    itemsPerPage
  ).map((person, index) => {
    return (
      <Row
        key={`${person.id}${index}`}
        {...person}
        onSelect={handleSelectUser}
      />
    );
  });

  return (
    <Body>
      <Container>
        <div className="w-2/3 m-2 flex flex-row justify-between">
          <Switcher onSelect={setShowRows} />
          <Button onClick={() => setShowForm(!showForm)}>
            {!showForm ? 'Добавить' : 'Закрыть форму'}
          </Button>
        </div>
        {showForm && <Form onAddItem={handleAddUser} />}
        <Filter onSearch={handleSearch} />
        {isLoading ? (
          'Загружаю...'
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
        {showRows === 'more' && (
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
