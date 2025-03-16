import { useNavigate } from "react-router-dom";
import Heart from "../../Trade/components/Heart";

const MyInterested = ({ interestedStocks }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">나의 관심종목</h2>

      {interestedStocks.length === 0 ? (
        <p className="text-gray-400 text-center">관심 종목이 없습니다.</p>
      ) : (
        interestedStocks.map((stock) => (
          <div
            key={stock.stockCode}
            className="bg-white rounded-2xl shadow-md px-4 py-2 flex items-center justify-between mb-2 cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102"
            onClick={() =>
              navigate(
                `/stock?code=${stock.stockCode}&name=${encodeURIComponent(
                  stock.stockName
                )}`
              )
            }
          >
            <div>
              <p className="text-sm font-semibold">{stock.stockName}</p>
              <p className="text-sm text-gray-400 font-light">
                {stock.currentPrice
                  ? `${Number(stock.currentPrice).toLocaleString()}원`
                  : stock.closingPrice
                  ? `${Number(stock.closingPrice).toLocaleString()}원`
                  : "-"}
              </p>
              {stock.priceChange !== null && stock.changeRate !== null && (
                <div className="flex items-center gap-x-0.5 text-sm font-medium">
                  <span
                    className={
                      stock.priceChange >= 0 ? "text-red-500" : "text-blue-500"
                    }
                  >
                    {stock.priceChange > 0
                      ? `+${stock.priceChange.toLocaleString()}`
                      : stock.priceChange.toLocaleString()}
                  </span>
                  <span
                    className={
                      stock.changeRate >= 0 ? "text-red-500" : "text-blue-500"
                    }
                  >
                    (
                    {stock.changeRate > 0
                      ? `+${stock.changeRate.toFixed(2)}`
                      : stock.changeRate.toFixed(2)}
                    %)
                  </span>
                </div>
              )}
            </div>

            <div
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart
                className="w-11 h-11"
                stockCode={stock.stockCode}
                initialFavorite={stock.isFavorite}
                onFavoriteChange={() => {}}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyInterested;
