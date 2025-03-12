import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../../common/components/Button";
import api from "../../../utils/api";

const OrderCheckModal = ({ quantity, price, onConfirm, onClose }) => {
  const [searchParams] = useSearchParams();
  const companyName = searchParams.get("name") || "알 수 없음";
  const type = searchParams.get("type") === "sell" ? "판매" : "구매";
  const isBuy = type === "구매";

  const totalPrice = quantity * price;

  const [accountInfo, setAccountInfo] = useState({
    accountNumber: "계좌 불러오는 중...",
    deposit: 0,
  });

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await api.get("/users/account");
        setAccountInfo({
          accountNumber: response.data.account || "정보 없음",
          deposit: response.data.deposit || 0,
        });
      } catch (error) {
        console.error("계좌 정보 불러오기 실패:", error);
      }
    };

    fetchAccountInfo();
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-end justify-center z-40"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        className="w-full max-w-md min-h-[50vh] h-auto bg-white rounded-t-3xl shadow-lg p-6 z-50 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-left text-lg font-bold">주문 확인</h2>

        <p className="text-lg font-semibold mt-5">
          {companyName} {quantity.toLocaleString()}주 {type}
        </p>
        <hr className="my-5 border-gray-300" />

        <div className="grid grid-cols-2 gap-y-5 text-sm">
          <span className="font-medium text-gray-600">구분</span>
          <span className="text-right">현금</span>

          <span className="font-medium text-gray-600">
            {isBuy ? "구매할 가격" : "판매할 가격"}
          </span>
          <span className="text-right">{price.toLocaleString()}원</span>

          <span className="font-medium text-gray-600">총 주문금액</span>
          <span className="text-right">{totalPrice.toLocaleString()}원</span>
        </div>

        <hr className="my-5 border-gray-300" />

        <div className="grid gap-y-5">
          <div className="grid grid-cols-2 gap-y-5 text-sm">
            <span className="font-medium text-gray-600">계좌정보</span>
            <span className="text-right">{accountInfo.accountNumber}</span>
          </div>
          <div className="grid grid-cols-2 gap-y-5 text-sm">
            <span className="font-medium text-gray-600">예치금</span>
            <span className="text-right">
              {accountInfo.deposit.toLocaleString()}원
            </span>
          </div>
        </div>

        <div className="w-full flex justify-center mt-10">
          <Button
            className="w-full text-lg"
            color={isBuy ? "red" : "blue"}
            onClick={onConfirm}
          >
            {type}하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckModal;
