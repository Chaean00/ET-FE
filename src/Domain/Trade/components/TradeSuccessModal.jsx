import { useSearchParams } from "react-router-dom";
import Button from "../../../common/components/Button";

const TradeSuccessModal = ({ onClose }) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") === "sell" ? "판매" : "구매";
  const isBuy = type === "구매";

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div
        className="w-[85%] max-w-sm h-[35%] bg-white rounded-3xl shadow-lg z-50 relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-grow flex items-center justify-center w-full">
          <p className="text-xl font-light">주문 완료!</p>
        </div>

        <div className="w-full mb-4 text-center">
          <Button
            variant="large"
            color={isBuy ? "red" : "blue"}
            onClick={onClose}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradeSuccessModal;
