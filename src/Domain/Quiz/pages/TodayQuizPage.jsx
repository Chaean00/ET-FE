import { useNavigate } from "react-router-dom";
import Footer from "../../../common/components/Footer";
import LevelPoint from "../components/LevelPoint";
import OXButton from "../components/OXButton";
import QuizContent from "../components/QuizContent";
import Answer from "../components/Answer";

const TodayQuizPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-[90%] flex-grow flex flex-col items-center">
        <LevelPoint level="매우어려움" levelColor="bg-red-500" points={100} />

        <div className="mt-6">
          <QuizContent>ETF는 Enhanced Type Fund의 줄임말이다.</QuizContent>
        </div>

        <div className="relative w-full flex flex-col items-center">
          <Answer />
          <div className="mt-20" onClick={() => navigate("/quizdone")}>
            <OXButton />
          </div>
        </div>
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default TodayQuizPage;
