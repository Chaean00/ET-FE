import Button from "../../../common/components/Button";

const SellFailureModal = ({ maxQuantity, onClose }) => {
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
            수량 부족 안내 <span className="text-red-500">❗</span>
          </p>
        </div>
        <p className="text-lg font-medium">
          최대 <span className="font-bold">{maxQuantity}주</span> 까지만 판매
          가능합니다.
        </p>
        <div className="w-full text-center mt-[-35px]">
          <Button variant="large" color="blue" onClick={onClose}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellFailureModal;
