import React from "react";
import ErrorMessage from "./ErrorMessage";

export const TableHead = () => {
  return (
    <thead>
      <tr>
        <th className="border px-4 py-2">Id</th>
        <th className="border px-4 py-2">First Name</th>
        <th className="border px-4 py-2">Last Name</th>
        <th className="border px-4 py-2">Email</th>
        <th className="border px-4 py-2">Phone</th>
      </tr>
    </thead>
  );
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const Table = ({ children, error }) => {
  return !error ? (
    <table className="table-auto border w-2/3 mb-4">
      <TableHead />
      {children}
    </table>
  ) : (
    <ErrorMessage text={error} />
  );
};

export default Table;
