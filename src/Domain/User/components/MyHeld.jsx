import { useNavigate } from "react-router-dom";

const MyHeld = ({ stocks }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">나의 보유상품</h2>

      {stocks.slice(0, 3).map((stock) => (
        <div
          key={stock.id}
          className="cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102 bg-white rounded-2xl shadow-md p-4 flex items-center space-x-3 mb-2 "
          onClick={() => {
            navigate("/stock");
          }}
        >
          <img src={stock.logo} alt={stock.name} className="w-10 h-10" />

          <div className="flex-1">
            <p className="font-semibold">{stock.name}</p>
            <p className="text-gray-400 text-sm font-light">
              현금 {stock.quantity}주
            </p>
          </div>

          <div className="text-right">
            <p className="text-md font-bold">
              {stock.price.toLocaleString()}원
            </p>
            <p
              className={`text-xs font-medium ${
                stock.profit > 0 ? "text-red-500" : "text-blue-500"
              }`}
            >
              {stock.profit > 0 ? "+" : ""}
              {stock.profit.toLocaleString()} ({stock.profitRate}%)
            </p>
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          className="w-[45%] mt-3 py-1.5 text-gray-400 text-sm font-medium bg-white border-1 rounded-3xl"
          onClick={() => navigate("/mystock")}
        >
          보유상품 더 보기 &gt;
        </button>
      </div>
    </div>
  );
};

export default MyHeld;
