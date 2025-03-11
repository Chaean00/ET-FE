import { useEffect } from "react";
import Footer from "../../../common/components/Footer";
import QuizDone from "../components/QuizDone";
import LevelPoint from "../components/LevelPoint";
import smart from "../../../assets/tradetown/smart.png";
import api from "../../../utils/api";
import useQuiz from "../../../hooks/useQuiz";

const QuizDonePage = () => {
  const { userUid, quizData, setQuizData, loading, setLoading } = useQuiz();

  useEffect(() => {
    if (!userUid) return;

    const fetchSolvedQuiz = async () => {
      try {
        setLoading(true);

        const savedAnswer = JSON.parse(
          localStorage.getItem(`${userUid}_quiz_answer`)
        );

        if (!savedAnswer || !savedAnswer.quizId) {
          console.warn("저장된 퀴즈 데이터 없음");
          setQuizData(null);
          setLoading(false);
          return;
        }

        const response = await api.get("/quizs/solved", {
          params: {
            quizId: savedAnswer.quizId,
            userAnswer: savedAnswer.userAnswer,
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
  }, [userUid, setQuizData, setLoading]);

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
          <img src={smart} className="w-9 h-9" alt="quiz result" />
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
