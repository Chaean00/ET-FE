const OXButton = ({ onAnswer, disabled }) => {
  return (
    <div className="flex justify-center space-x-13">
      <button
        className={`cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-115 w-30 h-30 bg-red-600 rounded-3xl flex items-center justify-center text-white text-6xl font-bold shadow-md ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && onAnswer(true)}
        disabled={disabled}
      >
        O
      </button>

      <button
        className={`cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-115 w-30 h-30 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-6xl font-bold shadow-md ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && onAnswer(false)}
        disabled={disabled}
      >
        X
      </button>
    </div>
  );
};

export default OXButton;
