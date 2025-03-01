import { useNavigate } from "react-router-dom";
import Footer from "../../../common/components/Footer";
import LevelPoint from "../components/LevelPoint";
import OXButton from "../components/OXButton";
import QuizContent from "../components/QuizContent";
import Answer from "../components/Answer";
import BackButton from "../../../common/components/BackButton";

const TodayQuizPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 left-4">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain" />
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full flex justify-center mt-24">
          <LevelPoint level="매우어려움" levelColor="bg-red-500" points={100} />
        </div>

        <div className="w-[85%] mt-8">
          <QuizContent>ETF는 Enhanced Type Fund의 줄임말이다.</QuizContent>
        </div>

        <div className="relative w-full flex flex-col items-center mt-12">
          <Answer />
          <div className="w-full mt-24" onClick={() => navigate("/quizdone")}>
            <OXButton />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
        <Footer />
      </div>
    </div>
  );
};

export default TodayQuizPage;
