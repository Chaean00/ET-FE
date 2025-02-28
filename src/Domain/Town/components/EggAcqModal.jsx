import ShakingEgg from "./ShakingEgg";

function EggAcqModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-white w-50 p-6 rounded-3xl shadow-lg flex flex-col items-center min-h-[200px]">
        <button
          className="absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="mt-5">
          <ShakingEgg />
        </div>
        <h2 className="text-blue-700 text-xl font-bold mt-4">알 획득!</h2>
      </div>
    </div>
  );
}

export default EggAcqModal;
