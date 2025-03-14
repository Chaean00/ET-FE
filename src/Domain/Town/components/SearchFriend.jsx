import { useState } from "react";

const SearchFriend = ({ onSearch, searchTerm, fetchFriends }) => {
  const [searchValue, setSearchValue] = useState(searchTerm);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
    if (e.target.value === "") {
      fetchFriends();
    }
  };

  return (
    <div className="w-[95%] h-[5.5vh] flex items-center">
      <input
        className="text-base border-none bg-white w-full h-full rounded-3xl px-6"
        type="text"
        placeholder="친구를 검색해보세요!"
        value={searchValue}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  );
};

export default SearchFriend;
