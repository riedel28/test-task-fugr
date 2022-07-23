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
    const filterInput = screen.getByRole('textbox');
    const findButton = screen.getByRole('button');

    fireEvent.change(filterInput, { target: { value: 'abc' } });
    fireEvent.click(findButton);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
