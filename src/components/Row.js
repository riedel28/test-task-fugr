import React from "react";

const Row = ({ id, firstName, lastName, email, phone, onSelect }) => {
  const onSelectItem = () => {
    onSelect({ id, firstName, lastName, email, phone });
  };
  return (
    <tr key={id} onClick={onSelectItem}>
      <td className="border px-4 py-2">{id}</td>
      <td className="border px-4 py-2">{firstName}</td>
      <td className="border px-4 py-2">{lastName}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">{phone}</td>
    </tr>
  );
};

export default Row;
