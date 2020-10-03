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
    expect(openFormButton).toHaveTextContent('Закрыть форму');
  });

  test('inputs and labels to be in the form', () => {
    const { getByTestId, getByLabelText } = render(<Form />);

    const openFormButton = getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    expect(getByLabelText(/id/i)).toBeInTheDocument();
    expect(getByLabelText(/имя/i)).toBeInTheDocument();
    expect(getByLabelText(/фамилия/i)).toBeInTheDocument();
    expect(getByLabelText(/почта/i)).toBeInTheDocument();
    expect(getByLabelText(/телефон/i)).toBeInTheDocument();
  });

  test('to show erros by submitting a blank form', () => {
    const { getByTestId, getByText } = render(<Form />);

    const openFormButton = getByTestId('form-open-button');
    fireEvent.click(openFormButton);

    const addUserButton = getByTestId('add-user-button');
    fireEvent.click(addUserButton);

    expect(getByText(/Введите id/i)).toBeInTheDocument();
    expect(getByText(/Введите имя/i)).toBeInTheDocument();
    expect(getByText(/Введите фамилию/i)).toBeInTheDocument();
    expect(getByText(/Введите электронную почту/i)).toBeInTheDocument();
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
      'Добавить в таблицу'
    );
  });
});
