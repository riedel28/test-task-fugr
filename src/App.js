import React, { useState, useEffect } from 'react';

import './styles/main.css';

import Body from './components/Body/Body';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Preloader from './components/Preloader/Preloader';
import Table from './components/Table/Table';

import { getUrl } from './api';
import useFetchData from './hooks/useFetchData';

function App() {
  const [list, setList] = useState([]);
  const [showRows, setShowRows] = useState('less');

  const [{ data, isLoading, error }] = useFetchData(getUrl(showRows));

  useEffect(() => {
    setList(data);
  }, [data, showRows]);

  const handleAddUser = (user) => {
    setList([user, ...list]);
  };

  return (
    <Body>
      <Container>
        <Header>
          <div className="mb-4">
            <Form onAddItem={handleAddUser} />
          </div>
        </Header>

        {isLoading ? (
          <Preloader />
        ) : (
          <Table
            data={list}
            setShowRows={setShowRows}
            showRows={showRows}
            error={error}
          />
        )}
      </Container>
    </Body>
  );
}

export default App;
