import Footer from "../../../common/components/Footer";
import QuizLevel from "../components/QuizLevel";

const QuizMainPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-start">
      <div className="mt-16 mb-2 w-full max-w-md">
        <div className="text-gray-800 text-2xl">매일매일 색다른</div>
        <div className="text-4xl font-bold">오늘의 QUIZ!</div>
      </div>

      <div className="w-full max-w-md mt-6">
        <QuizLevel />
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default QuizMainPage;
