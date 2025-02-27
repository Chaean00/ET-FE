import Footer from "../../../common/components/Footer";
import QuizDone from "../components/QuizDone";

const QuizDonePage = () => {
  return (
    <div>
      <div>오늘의 퀴즈를 푸셨어요.😎</div>
      <div>
        <QuizDone />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default QuizDonePage;
