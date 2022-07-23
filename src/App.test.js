import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    const button = screen.getByText(/add user/i);

    expect(button).toBeInTheDocument();
  });

  test('should show preloader', () => {
    const { getByTestId } = render(<App />);
    const preloader = getByTestId('preloader');

    expect(preloader).toBeInTheDocument();
  });
});
