import React from 'react';

const Row = ({ id, firstName, lastName, email, phone, onSelect }) => {
  const onSelectItem = () => {
    onSelect({ id, firstName, lastName, email, phone });
  };
  return (
    <tr onClick={onSelectItem} className="hover:bg-gray-300 cursor-pointer">
      <td className="border px-4 py-2">{id}</td>
      <td className="border px-4 py-2">{firstName}</td>
      <td className="border px-4 py-2">{lastName}</td>
      <td className="border px-4 py-2">{email.toLowerCase()}</td>
      <td className="border px-4 py-2">{phone}</td>
    </tr>
  );
};

export default Row;
