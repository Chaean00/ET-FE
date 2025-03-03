import Footer from "../../../common/components/Footer";
import QuizLevel from "../components/QuizLevel";

const QuizMainPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6">
        <div className="mt-3 mb-4 space-y-2">
          <div className="text-gray-700 text-2xl">매일매일 색다른</div>
          <div className="text-4xl font-bold text-gray-900">오늘의 QUIZ!</div>
        </div>

        <div className="w-full max-w-md mt-12">
          <QuizLevel />
        </div>
      </div>
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default QuizMainPage;
