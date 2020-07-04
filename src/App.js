import React, { useState, useEffect } from "react";
import "./styles/main.css";
import Table, { TableBody } from "./components/Table";
import Row from "./components/Row";

import { urlSmall, urlBig } from "./api";
import Form from "./components/Form";
import Filter from "./components/Filter";
import InfoCard from "./components/InfoCard";
import Pagination from "./components/Pagination";
import Switcher from "./components/Switcher";
import Button from "./components/Button";
import Body from "./components/Body";
import Container from "./components/Container";

function App() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [isLoading, setLoading] = useState(false);

  const [showRows, setShowRows] = useState("less");

  useEffect(() => {
    const url = showRows === "less" ? urlSmall : urlBig;

    setLoading(true);

    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        setLoading(false);
        setList(json);
        setFilteredList(json);
      });
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
    setError("");

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
      setError("Ничего не найдено");
    }

    setFilteredList(filteredUsers);
  };

  const displayPostsPerPage = (itemsList, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPosts = itemsList.slice(indexOfFirstItem, indexOfLastItem);

    return currentPosts;
  };

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          <Button>{!showForm ? "Добавить" : "Закрыть форму"}</Button>
        </div>
        {showForm && <Form onAddItem={handleAddUser} />}
        <Filter onSearch={handleSearch} />
        {isLoading ? (
          "Загружаю..."
        ) : (
          <Table error={error}>
            <TableBody>{displayTableRows}</TableBody>
          </Table>
        )}
        {selectedUser && <InfoCard user={selectedUser} />}
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
