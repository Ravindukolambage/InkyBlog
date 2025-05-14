import e from "cors";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchResult }) => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    console.log(value);
  };

  return (
    <div className="flex items-center bg-[#ffffff] w-80 rounded-lg h-11 p-4 shadow-lg md:w-100 ">
      <FaSearch className="cursor-pointer" />
      <input
        type="text"
        className="bg-transparent border-none outline-none text-base ml-2 w-full"
        placeholder="Search your post"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
