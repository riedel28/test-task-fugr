import React, { useState, useEffect } from "react";
import "./styles/main.css";
import Table, { TableHead, TableBody } from "./components/Table";
import Row from "./components/Row";

import { url } from "./api";
import Form from "./components/Form";
import InfoCard from "./components/InfoCard";

function App() {
  const [list, setList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        setList(json);
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
        <div className="w-2/3 my-2 flex flex-row mb-4">
          <input
            className="appearance-none w-1/2 block mr-2 bg-blue-100 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="Фильтр по таблице"
          />

          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">
            Найти
          </button>
        </div>
        <Table>
          <TableHead />
          <TableBody>
            {list.map((person, index) => {
              return (
                <Row
                  key={person.id + index}
                  {...person}
                  onSelect={handleSelectUser}
                />
              );
            })}
          </TableBody>
        </Table>
        {selectedUser && <InfoCard user={selectedUser} />}
      </div>
    </div>
  );
}

export default App;
