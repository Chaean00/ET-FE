const LevelPoint = ({ level, levelColor, points }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-xs">
      <span
        className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${levelColor}`}
      >
        {level}
      </span>

      <span className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-300 text-black">
        {points}p
      </span>
    </div>
  );
};
export default LevelPoint;

{
  /* 메모: 나중에 서버 연결할 때 난이도에 맞춰서 포인트 매핑하기 */
}
