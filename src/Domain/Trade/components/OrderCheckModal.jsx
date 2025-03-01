import Button from "../../../common/components/Button";

const OrderCheckModal = ({ type, companyName, quantity, price, onClose }) => {
  const totalPrice = quantity * price;
  const isBuy = type === "구매";

  return (
    <div className="fixed inset-0 flex items-end justify-center z-40">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div
        className="w-full max-w-md min-h-[50vh] h-auto bg-white rounded-t-3xl shadow-lg p-6 z-50 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-left text-lg font-bold">주문 확인</h2>

        <p className="text-lg font-semibold mt-5">
          {companyName} {quantity}주 {type}
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
        <div className="grid grid-cols-2 gap-y-5 text-sm">
          <span className="font-medium text-gray-600">계좌정보</span>
          <span className="text-right">212-85-656556</span>
        </div>

        <div className="w-full flex justify-center mt-10">
          <Button
            className="w-full text-lg"
            color={isBuy ? "red" : "blue"}
            onClick={onClose}
          >
            {type}하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckModal;
