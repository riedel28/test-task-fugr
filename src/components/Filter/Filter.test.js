import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';

describe('Filter', () => {
  test('renders Filter component ', () => {
    render(<Filter />);
    const filter = screen.getByTestId('filter');

    expect(filter).toBeInTheDocument();
  });

  test('should run onFilter function ', () => {
    const handleSearch = jest.fn();
    render(<Filter onFilter={handleSearch} />);
    const filterInput = screen.getByTestId('filter-input');
    const findButton = screen.getByText(/find/i);

    fireEvent.change(filterInput, { target: { value: 'abc' } });
    fireEvent.click(findButton);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
