import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TradeContent from "../components/TradeContent";
import BackButton from "../../../common/components/BackButton";
import TradeHeader from "../components/TradeHeader";
import Button from "../../../common/components/Button";
import OrderCheckModal from "../components/OrderCheckModal";
import TradeSuccessModal from "../components/TradeSuccessModal";
import BuyFailureModal from "../components/BuyFailureModal";
import SellFailureModal from "../components/SellFailureModal";
import api from "../../../utils/api";
import useSSE from "../../../hooks/useSSE";

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

  const { current } = useSSE("/subscribe", searchParams.get("code"));

  const handleOrderCheck = () => {
    const tradeType = searchParams.get("type");

    if (!quantity || quantity === "0") {
      alert("거래할 수량을 입력해주세요!");
      return;
    }

    if (quantity > maxQuantity) {
      if (tradeType === "buy") {
        setShowBuyFailureModal(true);
      } else {
        setShowSellFailureModal(true);
      }
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

      if (response.status === 200) {
        setShowOrderModal(false);
        setShowSuccessModal(true);
      } else {
        setShowOrderModal(false);
        alert("거래가 실패했습니다. 다시 시도해주세요!");
      }
    } catch (error) {
      console.error("거래 요청 실패:", error);
      setShowOrderModal(false);
      alert("서버 오류로 거래가 실패했습니다!");
    }
  };

  const handleOrderClose = () => {
    setShowOrderModal(false);
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
          onConfirm={handleOrderConfirm}
          onClose={handleOrderClose}
        />
      )}

      {showSuccessModal && <TradeSuccessModal onClose={handleSuccessClose} />}

      <div className="absolute top-0 left-0 w-full h-12 flex items-center p-2">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain" />
        </span>
      </div>

      <TradeHeader current={current}/>

      <TradeContent
        maxQuantity={maxQuantity}
        setMaxQuantity={setMaxQuantity}
        onQuantityChange={setQuantity}
        onPriceChange={setPrice}
        onTotalPriceChange={setTotalPrice}
      />

      <div className="absolute bottom-[75px] w-full px-4">
        <Button
          variant="large"
          color="#0046FF"
          className="w-full text-xl"
          onClick={handleOrderCheck}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default StockTradePage;
