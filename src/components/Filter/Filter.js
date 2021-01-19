import React, { useState } from 'react';

import { Input } from '../Form/InputWithLabel';
import Button from '../Button/Button';

const Filter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter(searchTerm);
  };

  return (
    <form
      className="flex flex-row flex-1 justify-end"
      onSubmit={handleSubmit}
      data-testid="filter"
    >
      <Input
        id="grid-password"
        type="text"
        placeholder="Фильтр по таблице"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        testId="filter-input"
      />

      <Button>Найти</Button>
    </form>
  );
};

export default Filter;
