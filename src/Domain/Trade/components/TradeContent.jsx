import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../utils/api";

const TradeContent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stockCode = searchParams.get("code");
  const stockName = searchParams.get("name");
  const stockCurPrice = searchParams.get("price");
  const type = searchParams.get("type") === "sell" ? "판매" : "구매";
  const isSell = type === "판매";

  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isPriceEditing, setIsPriceEditing] = useState(false);
  const [price, setPrice] = useState(stockCurPrice ? Number(stockCurPrice) : 0);
  const [maxQuantity, setMaxQuantity] = useState(100);

  const textareaRef = useRef(null);
  const inputTimeout = useRef(null);
  const priceInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isSell) {
          const response = await api.get("/users/stocks");
          const stock = response.data.find((s) => s.stockCode === stockCode);
          setMaxQuantity(stock ? stock.amount : 0);
        } else {
          const response = await api.get("/users/account");
          const deposit = response.data.deposit || 0;
          setMaxQuantity(price > 0 ? Math.floor(deposit / price) : 0);
        }
      } catch (error) {
        console.error("최대 수량 가져오기 실패:", error);
      }
    };

    fetchData();
  }, [stockCode, price, isSell]);

  // 🔥 총 가격 업데이트
  useEffect(() => {
    setTotalPrice(quantity && price ? quantity * price : 0);
  }, [price, quantity]);

  const handleQuantityChange = (value) => {
    const numValue = Number(value.replace(/[^0-9]/g, ""));
    setQuantity(numValue || "");

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

  const handlePriceClick = () => {
    setIsPriceEditing(true);
    setTimeout(() => priceInputRef.current?.focus(), 10);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value.replace(/[^0-9]/g, "");
    setPrice(newPrice ? Number(newPrice) : 0);
  };

  const handlePriceBlur = () => {
    setIsPriceEditing(false);
    if (!price) setPrice(stockCurPrice ? Number(stockCurPrice) : 0);
  };

  const handleNavigateToOrderBook = () => {
    navigate(
      `/orderbook?code=${stockCode}&name=${encodeURIComponent(stockName)}`
    );
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

        <div className="flex justify-between items-center">
          {isPriceEditing ? (
            <input
              ref={priceInputRef}
              type="text"
              className="text-4xl font-bold text-center border-blue rounded-lg px-2 py-1 w-36 focus:border-none"
              value={price}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlePriceBlur();
              }}
            />
          ) : (
            <p
              className="text-4xl font-bold cursor-pointer"
              onClick={handlePriceClick}
            >
              {price.toLocaleString()}원
            </p>
          )}

          <button
            className="cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102 border-2 border-blue-700 text-blue-500 px-3 py-1 rounded-4xl text-md font-black"
            onClick={handleNavigateToOrderBook}
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
            className="cursor-pointer bg-[#F7F8F8] text-blue-500 px-6 py-2 rounded-lg"
            onClick={() => handleQuantityChange("10")}
          >
            10주
          </button>
          <button
            className="cursor-pointer bg-[#F7F8F8] text-blue-500 px-6 py-2 rounded-lg"
            onClick={() => handleQuantityChange("50")}
          >
            50주
          </button>
          <button
            className="cursor-pointer bg-[#F7F8F8] text-blue-500 px-6 py-2 rounded-lg"
            onClick={() =>
              handleQuantityChange(parseInt(maxQuantity).toString())
            }
          >
            최대
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeContent;
