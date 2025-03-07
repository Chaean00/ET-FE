import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const DEFAULT_IMAGE =
  "https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png";

const SearchCompany = ({ onSearch, searchResults }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
    setSelectedIndex(-1);
    setIsDropdownVisible(true);
  };

  const handleKeyDown = (e) => {
    if (searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex !== -1) {
        setQuery(searchResults[selectedIndex].name);
        handleNavigate(searchResults[selectedIndex].code);
      }
    }
  };

  const handleNavigate = (stockCode, stockName) => {
    if (!stockCode) return;
    navigate(`/stock?code=${stockCode}&name=${encodeURIComponent(stockName)}`); // 🔥 /stock 페이지로 이동 + 쿼리 추가
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[60%] max-w-xs" ref={dropdownRef}>
      <input
        type="text"
        placeholder="주식 검색"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2 pl-4 pr-10 rounded-full border border-gray-300 
                   text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-blue-500"
      />
      <FiSearch
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg cursor-pointer"
        onClick={() => {
          const stock = searchResults.find((s) => s.name === query);
          if (stock) handleNavigate(stock.code);
        }}
      />

      {isDropdownVisible && searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-xl shadow-lg z-10">
          <ul>
            {searchResults.map((stock, index) => (
              <li
                key={stock.code}
                className={`rounded-xl p-2 flex items-center cursor-pointer ${
                  index === selectedIndex ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  setQuery(stock.name);
                  setIsDropdownVisible(false);
                  handleNavigate(stock.code, stock.name);
                }}
              >
                <img
                  src={stock.name === "삼성전자우" ? DEFAULT_IMAGE : stock.img}
                  alt={stock.name}
                  className="w-6 h-6 mr-2"
                />
                <span>
                  {stock.name}
                  <div className="text-xs text-gray-400">{stock.code}</div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchCompany;
