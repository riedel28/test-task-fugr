import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FormModal from './FormModal';

describe('FormModal', () => {
  test('inputs to be in the form', () => {
    render(<FormModal open={true} />);

    expect(screen.getByLabelText(/id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  test('submit button to be disabled, if inputs are empty', () => {
    const mockObserveFn = () => {
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    };

    window.IntersectionObserver = jest.fn().mockImplementation(mockObserveFn);

    render(<FormModal open={true} />);

    const addUserButton = screen.getByTestId('add-user-button');
    fireEvent.click(addUserButton);

    expect(addUserButton).toBeDisabled();
  });

  test('form to be submitted', () => {
    const mockObserveFn = () => {
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    };

    window.IntersectionObserver = jest.fn().mockImplementation(mockObserveFn);

    const handleSubmit = jest.fn();
    const handleClose = jest.fn();
    render(
      <FormModal open={true} onAddUser={handleSubmit} onClose={handleClose} />
    );

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
  });
});
