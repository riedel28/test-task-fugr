import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Table from './Table';

let tableProps;

beforeAll(() => {
  tableProps = {
    data: [
      {
        email: 'RTeel@sit.gov',
        firstName: 'Quincy',
        id: '685',
        lastName: 'Mcnulty',
        phone: '(591)428-0931',
      },
      {
        email: 'MAllshouse@molestie.net',
        firstName: 'Erich',
        id: '616',
        lastName: 'Bartleson',
        phone: '(467)431-9248',
      },
      {
        email: 'AImmormino@dolor.com',
        firstName: 'Vacharapol',
        id: '569',
        lastName: 'Bessko',
        phone: '(905)410-4927',
      },
    ],
    status: 'resolved',
    onChangeSortDirection: jest.fn(),
  };
});

describe('Table', () => {
  test('renders Table component', () => {
    render(<Table {...tableProps} />);
    const table = screen.getByTestId('table');

    expect(table).toBeInTheDocument();
  });

  test('table should have 3 rows', () => {
    render(<Table {...tableProps} />);
    const tableBody = screen.getByTestId('table-body');

    expect(tableBody.children).toHaveLength(tableProps.data.length);
  });

  test('should sort by id in descending order', () => {
    render(<Table {...tableProps} />);
    const tableBody = screen.getByTestId('table-body');
    const tableHeadId = screen.getByTestId('table-head-id');
    const [firstRow] = tableBody.children;

    fireEvent.click(tableHeadId);

    expect(firstRow).toHaveTextContent('685');
    expect(firstRow).toHaveTextContent('Quincy');
    expect(firstRow).toHaveTextContent('Mcnulty');
  });
});
