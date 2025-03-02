import { useNavigate } from "react-router-dom";
import Heart from "../../Trade/components/Heart";

const MyInterested = ({ interests }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">나의 관심종목</h2>

      {interests.map((stock) => (
        <div
          key={stock.id}
          className="bg-white rounded-2xl shadow-md px-4 py-2 flex items-center justify-between mb-2"
        >
          <div>
            <p
              className="cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102 text-sm font-semibold"
              onClick={() => {
                navigate("/stock");
              }}
            >
              {stock.name}
            </p>
            <p className="text-sm text-gray-400 font-light">
              {stock.price.toLocaleString()}원
            </p>
            <p
              className={`text-sm font-medium ${
                stock.change > 0 ? "text-red-500" : "text-blue-500"
              }`}
            >
              {stock.change > 0 ? "+" : ""}
              {stock.change.toLocaleString()} ({stock.changeRate}%)
            </p>
          </div>

          <div className="flex item-center">
            <Heart className="w-11 h-11" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyInterested;
