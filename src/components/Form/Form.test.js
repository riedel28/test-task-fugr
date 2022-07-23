import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
  test('renders Form open button', () => {
    render(<Form />);
    const openFormButton = screen.getByTestId('form-open-button');

    expect(openFormButton).toBeInTheDocument();
  });

  test('opens Form component by clicking button', () => {
    render(<Form />);
    const openFormButton = screen.getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    const form = screen.getByTestId('form');

    expect(form).toBeInTheDocument();
    expect(openFormButton).toHaveTextContent('Close form');
  });

  test('inputs and labels to be in the form', () => {
    render(<Form />);

    const openFormButton = screen.getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    expect(screen.getByLabelText(/id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  test('button to be disabled, if inputs are empty', () => {
    render(<Form />);

    const openFormButton = screen.getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    const addUserButton = screen.getByTestId('add-user-button');
    fireEvent.click(addUserButton);

    expect(addUserButton).toBeDisabled();
  });

  test('form to be submitted', () => {
    const handleSubmit = jest.fn();
    render(<Form onAddUser={handleSubmit} />);

    const openFormButton = screen.getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    fireEvent.change(screen.getByTestId('input-id'), {
      target: { value: '999' },
    });
    fireEvent.change(screen.getByTestId('input-firstName'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByTestId('input-lastName'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByTestId('input-email'), {
      target: { value: 'xyz@example.com' },
    });
    fireEvent.change(screen.getByTestId('input-phone'), {
      target: { value: '(123) 456-7891' },
    });

    const addUserButton = screen.getByTestId('add-user-button');
    fireEvent.click(addUserButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('form-open-button')).toHaveTextContent(
      'Add to the table'
    );
  });
});
