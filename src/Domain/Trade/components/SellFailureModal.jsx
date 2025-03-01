import Button from "../../../common/components/Button";

const SellFailureModal = ({ insufficientAmount, onClose }) => {
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
          <span className="font-bold">{insufficientAmount}원</span>이 부족해요.
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

export default SellFailureModal;
