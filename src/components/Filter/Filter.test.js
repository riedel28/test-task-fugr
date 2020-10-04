import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Filter from './Filter';

describe('Filter', () => {
  test('renders Filter component ', () => {
    const { getByTestId } = render(<Filter />);
    const filter = getByTestId('filter');

    expect(filter).toBeInTheDocument();
  });

  test('should run onSearch function ', () => {
    const handleSearch = jest.fn();
    const { getByTestId, getByText } = render(
      <Filter onSearch={handleSearch} />
    );
    const filterInput = getByTestId('filter-input');
    const findButton = getByText(/Найти/i);

    fireEvent.change(filterInput, { target: { value: 'abc' } });
    fireEvent.click(findButton);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
