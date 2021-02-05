import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Switcher from './Switcher';

describe('Switcher', () => {
  test('renders Switcher component', () => {
    const { getByTestId } = render(<Switcher />);
    const switcher = getByTestId('switcher');

    expect(switcher).toBeInTheDocument();
  });

  test('should run onSelect function by clicking a button', () => {
    const handleSelect = jest.fn();
    const { getByText } = render(<Switcher onSelect={handleSelect} />);
    const showMoreButton = getByText(/show more/i);

    fireEvent.click(showMoreButton);

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
