import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Switcher from './Switcher';

describe('Switcher', () => {
  test('renders Switcher component', () => {
    render(<Switcher />);
    const switcher = screen.getByTestId('switcher');

    expect(switcher).toBeInTheDocument();
  });

  test('should run onSelect function by clicking a button', () => {
    const handleSelect = jest.fn();
    render(<Switcher onSelect={handleSelect} />);
    const showMoreButton = screen.getByText(/show more/i);

    fireEvent.click(showMoreButton);

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
