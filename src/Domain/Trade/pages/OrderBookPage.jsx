import { useNavigate, useSearchParams } from "react-router-dom";
import OrderBook from "../components/OrderBook";
import BackButton from "../../../common/components/BackButton";
import TradeHeader from "../components/TradeHeader";
import useSSE from "../../../hooks/useSSE";

const OrderBookPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { current, askBid } = useSSE("/subscribe", searchParams.get("code"));

  return (
    <div className="flex flex-col items-center min-h-screen ">
      <div className="absolute top-0 left-0 w-full h-12 flex items-center p-2">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain" />
        </span>
      </div>

      <TradeHeader className="w-full max-w-md text-center" current={current}/>

      <div className="flex-grow w-full max-w-md flex justify-center items-center">
        <OrderBook askBid={askBid}/>
      </div>
    </div>
  );
};

export default OrderBookPage;
