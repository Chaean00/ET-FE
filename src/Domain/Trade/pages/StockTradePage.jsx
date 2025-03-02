import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../common/components/Footer";
import TradeContent from "../components/TradeContent";
import BackButton from "../../../common/components/BackButton";
import TradeHeader from "../components/TradeHeader";
import Button from "../../../common/components/Button";
import OrderCheckModal from "../components/OrderCheckModal";
import TradeSuccessModal from "../components/TradeSuccessModal";
import BuyFailureModal from "../components/BuyFailureModal";

const StockTradePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const tradeInfo = {
    type: "판매",
    companyName: "삼성전자",
    quantity: 50,
    price: 58000,
  };

  const handleOrderCheck = () => {
    setShowOrderModal(true);
  };

  const handleOrderConfirm = () => {
    setShowOrderModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative pb-[100px]">
      {showModal && (
        <BuyFailureModal maxQuantity={3} onClose={() => setShowModal(false)} />
      )}

      {showOrderModal && (
        <OrderCheckModal
          type={tradeInfo.type}
          companyName={tradeInfo.companyName}
          quantity={tradeInfo.quantity}
          price={tradeInfo.price}
          onClose={handleOrderConfirm}
        />
      )}

      {showSuccessModal && (
        <TradeSuccessModal type={tradeInfo.type} onClose={handleSuccessClose} />
      )}

      <div className="absolute top-0 left-0 w-full h-12 flex items-center p-2">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain" />
        </span>
      </div>

      <TradeHeader
        companyName="삼성전자"
        currentPrice={57200}
        changePercent={2.88}
      />

      <TradeContent type={tradeInfo.type} price={tradeInfo.price} />

      <div className="fixed bottom-[75px] w-full px-4">
        <Button
          variant="large"
          color="#0046FF"
          className="w-full text-xl"
          onClick={handleOrderCheck}
        >
          다음
        </Button>
      </div>

      <Footer className="fixed bottom-0 w-full max-w-md bg-white border-t" />
    </div>
  );
};

export default StockTradePage;
