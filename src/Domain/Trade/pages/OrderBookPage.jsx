import { useNavigate } from "react-router-dom";
import OrderBook from "../components/OrderBook";
import BackButton from "../../../common/components/BackButton";
import TradeHeader from "../components/TradeHeader";

const OrderBookPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen ">
      <div className="absolute top-0 left-0 w-full h-12 flex items-center p-2">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain" />
        </span>
      </div>

      <TradeHeader
        companyName="삼성전자"
        currentPrice={57200}
        changePercent={2.88}
        className="w-full max-w-md text-center"
      />

      <div className="flex-grow w-full max-w-md flex justify-center">
        <OrderBook />
      </div>
    </div>
  );
};

export default OrderBookPage;
