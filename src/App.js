import React, { useState, useEffect } from "react";
import "./styles/main.css";
import Table, { TableHead, TableBody } from "./components/Table";
import Row from "./components/Row";

import { url } from "./api";
import Form from "./components/Form";
import Filter from "./components/Filter";
import InfoCard from "./components/InfoCard";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [list, setList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        setList(json);
        setFilteredList(json);
      });
  }, []);

  const handleSelectUser = (user) => {
    const foundUser = list.find(({ id }) => id === user.id);

    setSelectedUser(foundUser);
  };

  const handleAddUser = (user) => {
    setList((prevState) => [user, ...prevState]);
    setShowForm(false);
  };

  const handleSearch = (searchTerm) => {
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

  return (
    <div className="min-h-screen bg-blue-100 ">
      <div className="container mx-auto flex justify-center items-center  flex-col p-4">
        <div className="w-2/3 m-2 flex flex-row justify-between">
          <div className="inline-flex">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              Показать много
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              Показать мало
            </button>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded"
          >
            {!showForm ? "Добавить" : "Закрыть форму"}
          </button>
        </div>
        {showForm && <Form onAddItem={handleAddUser} />}
        <Filter onSearch={handleSearch} />
        {filteredList.length > 0 ? (
          <Table>
            <TableHead />
            <TableBody>
              {filteredList.map((person, index) => {
                return (
                  <Row
                    key={`${person.id}${index}`}
                    {...person}
                    onSelect={handleSelectUser}
                  />
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <ErrorMessage text={error} />
        )}
        {selectedUser && <InfoCard user={selectedUser} />}
      </div>
    </div>
  );
}

export default App;
