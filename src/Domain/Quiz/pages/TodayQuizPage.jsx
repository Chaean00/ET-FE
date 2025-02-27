import Footer from "../../../common/components/Footer";
import LevelPoint from "../components/LevelPoint";
import OXButton from "../components/OXButton";
import QuizContent from "../components/QuizContent";
import Answer from "../components/Answer";

const TodayQuizPage = () => {
  return (
    <div>
      <div>
        <LevelPoint level={"매우어려움"} />
      </div>
      <div>
        <QuizContent>ETF는 Enhanced Type Fund의 줄임말이다.</QuizContent>
      </div>
      <div>
        <Answer />
      </div>
      <div>
        <OXButton />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default TodayQuizPage;
