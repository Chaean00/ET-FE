import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchCompany = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative w-[50%] max-w-xs">
      <input
        type="text"
        placeholder="주식 검색"
        value={query}
        onChange={handleChange}
        className="w-full p-2 pl-4 pr-10 rounded-full border border-gray-300 
                   text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-blue-500"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg" />
    </div>
  );
};

export default SearchCompany;
