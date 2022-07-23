import React, { useState, useEffect } from 'react';

import Body from './components/Body/Body';
import Container from './components/Container/Container';
import FormModal from './components/Form/FormModal';
import Table from './components/Table/Table';

import { getUrl } from './api';
import useFetchData from './hooks/useFetchData';

import './styles/main.css';
import Button from './components/Button/Button';

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
        <div className="flex justify-between mb-4 mt-2">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              email and phone
            </p>
          </div>
          <div className="mb-3">
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
        </div>

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
