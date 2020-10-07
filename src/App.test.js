import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders App component', () => {
    const { getByText } = render(<App />);
    const button = getByText(/Добавить в таблицу/i);

    expect(button).toBeInTheDocument();
  });

  test('should show preloader', () => {
    const { getByTestId } = render(<App />);
    const preloader = getByTestId('preloader');

    expect(preloader).toBeInTheDocument();
  });

  test('should show pagination', async () => {
    const { queryByTestId, getByText, findByTestId } = render(<App />);

    expect(queryByTestId('pagination')).toBeNull();

    fireEvent.click(getByText(/Показать много/i));

    expect(await findByTestId('pagination')).toBeInTheDocument();
  });
});
