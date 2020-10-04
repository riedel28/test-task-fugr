import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Table from './Table';

let testData;

beforeAll(() => {
  testData = [
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
  ];
});

describe('Table', () => {
  test('renders Table component', () => {
    const { getByTestId } = render(<Table data={testData} />);
    const table = getByTestId('table');

    expect(table).toBeInTheDocument();
  });

  test('table should have 3 rows', () => {
    const { getByTestId } = render(<Table data={testData} />);
    const tableBody = getByTestId('table-body');

    expect(tableBody.children).toHaveLength(testData.length);
  });

  test('should sort by id in descending order', () => {
    const handleSort = jest.fn();
    const { getByTestId } = render(
      <Table
        data={testData}
        onSort={handleSort}
        onChangeSortDirection={() => {}}
      />
    );
    const tableBody = getByTestId('table-body');
    const tableHeadId = getByTestId('table-head-id');
    const firstRow = tableBody.children[0];

    fireEvent.click(tableHeadId);

    expect(handleSort).toHaveBeenCalledTimes(1);
    expect(firstRow).toHaveTextContent('685');
    expect(firstRow).toHaveTextContent('Quincy');
    expect(firstRow).toHaveTextContent('Mcnulty');
  });
});
