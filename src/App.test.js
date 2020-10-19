import React from 'react';
import { render } from '@testing-library/react';
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
});
