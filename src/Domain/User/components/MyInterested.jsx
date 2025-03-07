import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import Heart from "../../Trade/components/Heart";

const dummyInterests = [
  {
    id: "005930",
    name: "삼성전자",
    price: 57200,
    change: -500,
    changeRate: -0.8,
  },
  { id: "035420", name: "NAVER", price: 215000, change: 3200, changeRate: 1.5 },
];

const MyInterested = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState(dummyInterests);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/users/favorite");
        if (Array.isArray(response.data)) {
          const formattedData = response.data.map((stock) => ({
            id: stock.stockCode,
            name: stock.stockName,
            price: 0,
            change: 0,
            changeRate: 0,
          }));
          setInterests(formattedData);
        }
      } catch (error) {
        console.error("관심 종목 불러오기 실패:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">나의 관심종목</h2>

      {interests.length === 0 ? (
        <p className="text-gray-400 text-center">관심 종목이 없습니다.</p>
      ) : (
        interests.map((stock) => (
          <div
            key={stock.id}
            className="bg-white rounded-2xl shadow-md px-4 py-2 flex items-center justify-between mb-2"
          >
            <div>
              <p
                className="cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102 text-sm font-semibold"
                onClick={() => {
                  navigate(`/stock/${stock.id}`);
                }}
              >
                {stock.name}
              </p>
              <p className="text-sm text-gray-400 font-light">
                {stock.price ? `${stock.price.toLocaleString()}원` : "-"}{" "}
                {/* 🔥 가격 정보 없음 */}
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
        ))
      )}
    </div>
  );
};

export default MyInterested;
