import { useSearchParams } from "react-router-dom";
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
import SellFailureModal from "../components/SellFailureModal";
import api from "../../../utils/api";

const StockTradePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showBuyFailureModal, setShowBuyFailureModal] = useState(false);
  const [showSellFailureModal, setShowSellFailureModal] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(100);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOrderCheck = () => {
    if (!quantity || quantity === "0") {
      alert("거래할 수량을 입력해주세요!");
      return;
    }
    setShowOrderModal(true);
  };

  const handleOrderConfirm = async () => {
    const tradeType = searchParams.get("type");
    if (!tradeType) {
      alert("거래 유형을 확인할 수 없습니다.");
      return;
    }

    if (!quantity || quantity <= 0) {
      alert("거래할 수량을 입력해주세요!");
      return;
    }

    if (!price || price <= 0) {
      alert("가격이 올바르지 않습니다.");
      return;
    }

    try {
      const response = await api.post(`/trades/${tradeType}`, {
        amount: quantity,
        position: tradeType.toUpperCase(),
        price: price,
        stockCode: searchParams.get("code"),
      });

      if (response.status !== 200) {
        console.log("매매 성공");
        setShowOrderModal(false);
        setShowSuccessModal(true);
      } else {
        setShowOrderModal(false);
        if (tradeType === "buy") {
          setShowBuyFailureModal(true);
        } else {
          setShowSellFailureModal(true);
        }
      }
    } catch (error) {
      console.error("거래 요청 실패:", error);
      setShowOrderModal(false);
      if (tradeType === "buy") {
        setShowBuyFailureModal(true);
      } else {
        setShowSellFailureModal(true);
      }
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative pb-[100px]">
      {showBuyFailureModal && (
        <BuyFailureModal
          totalPrice={totalPrice}
          onClose={() => setShowBuyFailureModal(false)}
        />
      )}

      {showSellFailureModal && (
        <SellFailureModal
          maxQuantity={maxQuantity}
          onClose={() => setShowSellFailureModal(false)}
        />
      )}

      {showOrderModal && (
        <OrderCheckModal
          quantity={quantity}
          price={price}
          totalPrice={totalPrice}
          onConfirm={handleOrderConfirm}
        />
      )}

      {showSuccessModal && <TradeSuccessModal onClose={handleSuccessClose} />}

      <div className="absolute top-0 left-0 w-full h-12 flex items-center p-2">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain" />
        </span>
      </div>

      <TradeHeader />

      <TradeContent
        maxQuantity={maxQuantity}
        setMaxQuantity={setMaxQuantity}
        onQuantityChange={setQuantity}
        onPriceChange={setPrice}
        onTotalPriceChange={setTotalPrice}
      />

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
