import React, { useState, useEffect } from 'react';
import './styles/main.css';
import Table, { TableBody } from './components/Table';
import Row from './components/Row';

import { urlSmall, urlBig } from './api';
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
  const url = showRows === 'less' ? urlSmall : urlBig;

  const [sortingDirection, setSortingDirection] = useState('');

  const sortBy = (key) => {
    const sortedList = filteredList.sort((a, b) => {
      if (!isNaN(a[key]) && !isNaN(b[key])) {
        return sortNumbers(a, b, key, sortingDirection);
      }

      return sortStrings(a, b, key, sortingDirection);
    });

    setFilteredList([...sortedList]);
  };

  const fetchData = async (url) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      setLoading(false);
      setList(data);
      setFilteredList(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

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

  const sortNumbers = (a, b, key, direction) => {
    return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
  };

  const sortStrings = (a, b, key, direction) => {
    return direction === 'asc'
      ? a[key].localeCompare(b[key])
      : b[key].localeCompare(a[key]);
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
    filteredList,
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
        <Pagination
          total={filteredList.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePaginate}
        />
      </Container>
    </Body>
  );
}

export default App;
