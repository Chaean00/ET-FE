const LevelPoint = ({ level }) => {
  const levelMap = {
    TOP: "매우어려움",
    HIGH: "어려움",
    MEDIUM: "적당함",
    LOW: "쉬움",
  };

  const pointMap = {
    TOP: 100,
    HIGH: 70,
    MEDIUM: 50,
    LOW: 10,
  };

  const colorMap = {
    TOP: "bg-red-500",
    HIGH: "bg-orange-400",
    MEDIUM: "bg-green-400",
    LOW: "bg-yellow-500",
  };

  return (
    <div className="flex items-center justify-between w-full max-w-xs">
      <span
        className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${
          colorMap[level] || "bg-gray-500"
        }`}
      >
        {levelMap[level] || "알 수 없음"}
      </span>

      <span className="px-4 py-1 rounded-full text-sm font-semibold bg-black text-white">
        {pointMap[level] || 0}p
      </span>
    </div>
  );
};

export default LevelPoint;
