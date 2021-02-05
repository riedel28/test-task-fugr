import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
  test('renders Form open button', () => {
    const { getByTestId } = render(<Form />);

    const openFormButton = getByTestId('form-open-button');
    expect(openFormButton).toBeInTheDocument();
  });

  test('opens Form component by clicking button', () => {
    const { getByTestId } = render(<Form />);

    const openFormButton = getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    const form = getByTestId('form');

    expect(form).toBeInTheDocument();
    expect(openFormButton).toHaveTextContent('Close form');
  });

  test('inputs and labels to be in the form', () => {
    const { getByTestId, getByLabelText } = render(<Form />);

    const openFormButton = getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    expect(getByLabelText(/id/i)).toBeInTheDocument();
    expect(getByLabelText(/first name/i)).toBeInTheDocument();
    expect(getByLabelText(/last name/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/phone/i)).toBeInTheDocument();
  });

  test('button to be disabled, if inputs are empty', () => {
    const { getByTestId } = render(<Form />);

    const openFormButton = getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    const addUserButton = getByTestId('add-user-button');
    fireEvent.click(addUserButton);

    expect(addUserButton).toBeDisabled();
  });

  test('form to be submitted', () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<Form onAddItem={handleSubmit} />);

    const openFormButton = getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    fireEvent.change(getByTestId('input-id'), {
      target: { value: '999' },
    });
    fireEvent.change(getByTestId('input-firstName'), {
      target: { value: 'John' },
    });
    fireEvent.change(getByTestId('input-lastName'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(getByTestId('input-email'), {
      target: { value: 'xyz@example.com' },
    });
    fireEvent.change(getByTestId('input-phone'), {
      target: { value: '(123) 456-7891' },
    });

    const addUserButton = getByTestId('add-user-button');
    fireEvent.click(addUserButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(getByTestId('form-open-button')).toHaveTextContent(
      'Add to the table'
    );
  });
});
