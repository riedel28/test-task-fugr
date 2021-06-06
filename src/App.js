import React, { useState, useEffect } from 'react';

import './styles/main.css';

import Body from './components/Body/Body';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Table from './components/Table/Table';

import { getUrl } from './api';
import useFetchData from './hooks/useFetchData';

function App() {
  const [list, setList] = useState([]);
  const [amountOfRecords, setAmountOfRecords] = useState(32);
  const [data, status, error] = useFetchData(getUrl(amountOfRecords));

  useEffect(() => {
    setList(data);
  }, [data, amountOfRecords]);

  const handleAddUser = (user) => {
    setList([user, ...list]);
  };

  return (
    <Body>
      <Container>
        <Header>
          <Form onAddItem={handleAddUser} />
        </Header>

        <Table
          data={list}
          setAmountOfRecords={setAmountOfRecords}
          amountOfRecords={amountOfRecords}
          status={status}
          error={error}
        />
      </Container>
    </Body>
  );
}

export default App;
