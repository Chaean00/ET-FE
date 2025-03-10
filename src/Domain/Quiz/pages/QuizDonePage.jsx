import { useEffect, useState } from "react";
import Footer from "../../../common/components/Footer";
import QuizDone from "../components/QuizDone";
import LevelPoint from "../components/LevelPoint";
import smart from "../../../assets/tradetown/smart.png";
import api from "../../../utils/api";

const QuizDonePage = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolvedQuiz = async () => {
      try {
        const storedAnswer = JSON.parse(sessionStorage.getItem("quiz_answer"));

        if (!storedAnswer || !storedAnswer.quizId) {
          console.error("저장된 퀴즈 데이터가 없습니다.");
          return;
        }

        const response = await api.get("/quizs/solved", {
          params: {
            quizId: storedAnswer.quizId,
            userAnswer: storedAnswer.userAnswer,
          },
        });

        setQuizData(response.data);
      } catch (error) {
        console.error(
          "퀴즈 결과 로딩 오류:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSolvedQuiz();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-bold mt-10">
        퀴즈 결과 불러오는 중...
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="text-center text-lg font-bold mt-10">
        퀴즈 데이터를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="px-6">
        <div className="m-auto mt-14 flex justify-between w-full max-w-xs">
          <LevelPoint level={quizData.solvedQuizDifficulty} />
        </div>

        <div className="flex justify-center text-2xl font-bold text-center mt-7">
          <div className="text-center self-end">오늘의 퀴즈를 푸셨어요.</div>
          <img src={smart} className="w-9 h-9" />
        </div>

        <div className="m-auto w-[90%] bg-white px-4.5 rounded-3xl shadow-lg mt-8">
          <QuizDone
            content={quizData.solvedQuizTitle}
            points={quizData.currentUserPoints}
          />
        </div>
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default QuizDonePage;
