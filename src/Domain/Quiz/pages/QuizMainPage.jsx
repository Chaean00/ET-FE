import Footer from "../../../common/components/Footer";
import QuizLevel from "../components/QuizLevel";

const QuizMainPage = () => {
  return (
    <div>
      <div>
        <div>매일매일 색다른</div>
        <div>오늘의 QUIZ!</div>
      </div>
      <div>
        <QuizLevel />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default QuizMainPage;
