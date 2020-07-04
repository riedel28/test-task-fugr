import React from "react";

const Switcher = ({ onSelect }) => {
  return (
    <div className="inline-flex">
      <button
        onClick={() => {
          onSelect("more");
        }}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
      >
        Показать много
      </button>
      <button
        onClick={() => {
          onSelect("less");
        }}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Показать мало
      </button>
    </div>
  );
};

export default Switcher;
