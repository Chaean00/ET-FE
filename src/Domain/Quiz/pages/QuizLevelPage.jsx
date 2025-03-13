import QuizLevel from "../components/QuizLevel";
import GPTlogo from "../../../assets/tradetown/GPTlogo.png";
import { useNavigate } from "react-router-dom";
const QuizMainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute flex flex-col items-center top-1 right-3 rounded-full border-gray-500 shadow-[0_20px_20px_rgba(0,0,0,0.2)] hover:opacity-65">
        <img
          src={GPTlogo}
          alt="GPT Logo"
          className="w-20 h-20 cursor-pointer "
          onClick={() => navigate("/ChatbotPage")}
        />
      </div>
      <div className="px-6">
        <div className="mt-3 mb-4 space-y-2">
          <div className="text-gray-700 text-2xl">매일매일 색다른</div>
          <div className="text-4xl font-bold text-gray-900">오늘의 QUIZ!</div>
        </div>

        <div className="w-full max-w-md mt-12">
          <QuizLevel />
        </div>
      </div>
    </div>
  );
};

export default QuizMainPage;
