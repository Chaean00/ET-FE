import { useState } from "react";

const SearchFriend = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="w-[95%] h-[5.5vh] flex items-center">
      <input
        className="text-base border-none bg-white w-full h-full rounded-3xl px-6"
        type="text"
        placeholder="친구를 검색해보세요!"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchFriend;
