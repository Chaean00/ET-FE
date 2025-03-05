import Footer from "../../../common/components/Footer";
import QuizDone from "../components/QuizDone";
import LevelPoint from "../components/LevelPoint";
import smart from "../../../assets/tradetown/smart.png";


const QuizDonePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      
      <div className="px-6">
        <div className="m-auto mt-14 flex justify-between w-full max-w-xs">
          <LevelPoint level="매우어려움" levelColor="bg-red-500" points={200} />
        </div>

        <div className="flex justify-center text-2xl font-bold text-center  mt-7">
          <div className="text-center self-end">오늘의 퀴즈를 푸셨어요.</div>
          <img src={smart} className="w-9 h-9" />
        </div>

        <div className="m-auto w-[90%] bg-white px-4.5 rounded-3xl shadow-lg mt-8">
          <QuizDone content={"ETF는 Enhanced Type Fund의 줄임말이다."} />
        </div>
      </div>
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default QuizDonePage;
