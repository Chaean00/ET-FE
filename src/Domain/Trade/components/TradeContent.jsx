import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TradeContent = ({ type, price }) => {
  const navigate = useNavigate();
  const isSell = type === "판매";
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const textareaRef = useRef(null);
  const inputTimeout = useRef(null);

  const handleQuantityChange = (value) => {
    const numValue = Number(value.replace(/[^0-9]/g, ""));
    setQuantity(numValue || "");
    setTotalPrice(numValue ? numValue * price : "");

    if (inputTimeout.current) {
      clearTimeout(inputTimeout.current);
    }

    inputTimeout.current = setTimeout(() => {
      if (numValue) setIsEditing(false);
    }, 350);
  };

  const handleBlur = () => {
    if (quantity) setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
  };

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (textareaRef.current) {
        const pos = quantity.toString().length;
        textareaRef.current.selectionStart = pos;
        textareaRef.current.selectionEnd = pos;
        textareaRef.current.focus();
      }
    }, 10);
  };

  return (
    <div className="relative">
      <style>
        {`
          textarea::placeholder {
            color: #d1d5db; 
            font-size: 1.5em; 
            font-weight: 300; 
            opacity: 0.4; 
          }
        `}
      </style>

      <div className="bg-[#F4F9FE] items-center px-4 py-8 space-y-10">
        <div>
          <p className="text-gray-500 text-md">{type}할 가격</p>
        </div>
        <div className="flex justify-between">
          <p className="text-4xl font-bold">{price.toLocaleString()}원</p>

          <button
            className="border border-blue-700 text-blue-500 px-3 py-1 rounded-4xl text-md font-black font-[#0046FF]"
            onClick={() => navigate("/orderbook")}
          >
            호가보기
          </button>
        </div>
      </div>

      <div className="mt-4 mx-4 relative">
        <p className="text-gray-400 text-md">{type}할 수량</p>

        <div
          className="w-full mt-1 py-3 border-none rounded-lg focus:outline-none 
                     focus:border-blue-500 resize-none overflow-hidden cursor-pointer 
                     min-h-[56px]"
          onClick={handleClick}
        >
          {isEditing ? (
            <textarea
              ref={textareaRef}
              placeholder={`몇 주 ${isSell ? "팔까요?" : "살까요?"}`}
              className="w-full text-2xl font-bold text-black 
                        placeholder-gray-200 placeholder-opacity-50 placeholder:font-light 
                        focus:outline-none resize-none overflow-hidden h-14"
              value={quantity ? `${quantity}주` : ""}
              onChange={(e) => handleQuantityChange(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div>
              <div className="text-4xl font-bold">{quantity}주</div>
              <div className="text-lg font-light text-gray-500">
                {totalPrice.toLocaleString()}원
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-[-50px] left-0 w-full flex space-x-2 mt-4">
          <button
            className="bg-[#F7F8F8] text-blue-500 px-6 py-2 rounded-lg"
            onClick={() => {
              handleQuantityChange("10");
              setIsEditing(false);
            }}
          >
            10주
          </button>
          <button
            className="bg-[#F7F8F8] text-blue-500 px-6 py-2 rounded-lg"
            onClick={() => {
              handleQuantityChange("50");
              setIsEditing(false);
            }}
          >
            50주
          </button>
          <button
            className="bg-[#F7F8F8] text-blue-500 px-6 py-2 rounded-lg"
            onClick={() => {
              handleQuantityChange("100");
              setIsEditing(false);
            }}
          >
            최대
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeContent;
