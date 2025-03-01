const QuizDone = ({ content }) => {
  return (
    <div className="h-[45vh] flex flex-col justify-around">
      <div className="text-2xl font-bold">
        <div>{content}</div>
        <div className="mt-10 text-center font-black">정답: O</div>
      </div>
      <div className="text-center">
        오늘 획득한 포인트: <span className="font-bold">100</span>
      </div>
    </div>
  );
};
export default QuizDone;
