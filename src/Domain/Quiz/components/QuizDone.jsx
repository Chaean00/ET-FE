const QuizDone = () => {
  return (
    <div className="h-[60vh] flex flex-col justify-around">
      <div className="text-2xl font-bold">
        <div>ETF는 Enhanced Type Fund의 줄임말이다.</div>
        <div className="mt-8 text-center font-black">정답: O</div>
      </div>
      <div className="text-center">
        오늘 획득한 포인트: <span className="font-bold">100</span>
      </div>
    </div>
  );
};
export default QuizDone;
