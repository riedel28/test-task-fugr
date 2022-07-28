import React, { useState, useEffect } from 'react';

import Body from './components/Body/Body';
import Container from './components/Container/Container';
import FormModal from './components/Form/FormModal';
import Table from './components/Table/Table';

import { getUrl } from './api';
import useFetchData from './hooks/useFetchData';

import './styles/main.css';
import Button from './components/Button/Button';
import styles from './App.module.css';

function App() {
  const [list, setList] = useState([]);
  const [amountOfRecords, setAmountOfRecords] = useState(32);
  const [data, status, error] = useFetchData(getUrl(amountOfRecords));
  const [formModalVisible, setFormModalVisible] = useState(false);

  useEffect(() => {
    setList(data);
  }, [data, amountOfRecords]);

  const handleAddUser = (user) => {
    setList([user, ...list]);
  };

  return (
    <Body>
      <Container>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Users</h1>
            <p className={styles.subtitle}>
              A list of all the users in your account including their name,
              email and phone
            </p>
          </div>
          <div>
            <Button
              onClick={() => setFormModalVisible(true)}
              testId="form-open-button"
            >
              Add user
            </Button>
            <FormModal
              open={formModalVisible}
              onAddUser={handleAddUser}
              onClose={setFormModalVisible}
            />
          </div>
        </header>

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
