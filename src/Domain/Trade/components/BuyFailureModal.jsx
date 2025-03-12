import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Button from "../../../common/components/Button";

const BuyFailureModal = ({ totalPrice, onClose }) => {
  const [insufficientAmount, setInsufficientAmount] = useState(0);

  useEffect(() => {
    const fetchDeposit = async () => {
      try {
        const response = await api.get("/users/account");
        const deposit = response.data.deposit || 0;
        const shortfall = Math.max(totalPrice - deposit, 0);
        setInsufficientAmount(shortfall);
      } catch (error) {
        console.error("예치금 정보 불러오기 실패:", error);
        setInsufficientAmount(totalPrice);
      }
    };

    fetchDeposit();
  }, [totalPrice]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div
        className="w-[85%] max-w-sm h-[35%] bg-white rounded-3xl shadow-lg z-50 relative flex flex-col items-center justify-around"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mt-2">
          <p className="text-xl font-bold">
            잔액 부족 안내 <span className="text-red-500">❗</span>
          </p>
        </div>
        <p className="text-lg font-medium">
          <span className="font-bold">
            {insufficientAmount.toLocaleString()}원
          </span>
          이 부족해요.
        </p>
        <div className="w-full text-center mt-[-35px]">
          <Button variant="large" color="red" onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyFailureModal;
