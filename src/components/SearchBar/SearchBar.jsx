import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    onSearch(value);
  };

  return (
    <div className="flex justify-center items-center bg-[#ffffff] w-80 rounded-lg h-11 p-4 shadow-lg md:w-100">
      <FaSearch className="cursor-pointer" />
      <input
        type="text"
        className="bg-transparent border-none outline-none text-base ml-2 w-full"
        placeholder="Search your post"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
