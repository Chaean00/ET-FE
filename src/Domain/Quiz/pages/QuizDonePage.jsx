import Footer from "../../../common/components/Footer";
import QuizDone from "../components/QuizDone";
import LevelPoint from "../components/LevelPoint";

const QuizDonePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <LevelPoint level="매우어려움" levelColor="bg-red-500" points={100} />
      <div className="tracking-wider text-2xl font-bold">
        오늘 이미 퀴즈를 풀었어요.😎
      </div>
      <div className="w-[80%] px-8 rounded-3xl shadow-xl">
        <QuizDone />
      </div>
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};
export default QuizDonePage;
