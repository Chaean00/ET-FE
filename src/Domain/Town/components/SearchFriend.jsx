const SearchFriend = () => {
  return (
    <div className="w-[95%] h-[6vh] flex items-center px-4">
      <input
        className="text-base border-none bg-white w-full h-full rounded-3xl px-3 ml-2"
        type="text"
        placeholder="친구를 검색해보세요!"
      />
    </div>
  );
};

export default SearchFriend;
