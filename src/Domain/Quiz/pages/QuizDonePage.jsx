import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizDone from "../components/QuizDone";
import LevelPoint from "../components/LevelPoint";
import smart from "../../../assets/tradetown/smart.png";
import api from "../../../utils/api";
import useQuiz from "../../../hooks/useQuiz";
import GPTlogo from "../../../assets/tradetown/GPTlogo.png";
import { BarLoader } from "react-spinners";

const pointMap = {
  TOP: 100,
  HIGH: 70,
  MEDIUM: 50,
  LOW: 10,
};

const QuizDonePage = () => {
  const navigate = useNavigate();
  const { userUid, quizData, setQuizData, loading, setLoading } = useQuiz();
  const [earnedPoints, setEarnedPoints] = useState(0);

  useEffect(() => {
    if (!userUid) return;

    const fetchSolvedQuiz = async () => {
      try {
        setLoading(true);

        const savedAnswer = JSON.parse(
          localStorage.getItem(`${userUid}_quiz_answer`)
        );

        if (!savedAnswer || savedAnswer.quizId === undefined) {
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

        const quizResult = response.data;

        const earned =
          savedAnswer.userAnswer === quizResult.quizanswer
            ? pointMap[quizResult.solvedQuizDifficulty] || 0
            : 0;

        setEarnedPoints(earned);

        setQuizData({
          ...quizResult,
          earnedPoints: earned,
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchSolvedQuiz();
  }, [userUid, setQuizData, setLoading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <BarLoader height={3} width={195} color="#0046FF" />
        <div className="mt-4 text-xl font-bold text-[#0046FF]">
          오늘 풀었던 퀴즈 불러오는 중!
        </div>
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
      <div className="absolute flex flex-col items-center top-1 right-3 rounded-full border-gray-500 shadow-[0_20px_20px_rgba(0,0,0,0.2)] hover:opacity-65">
        <img
          src={GPTlogo}
          alt="GPT Logo"
          className="w-20 h-20 cursor-pointer "
          onClick={() => navigate("/ChatbotPage")}
        />
      </div>
      <div className="px-6">
        <div className="m-auto mt-26 flex justify-between w-full max-w-xs">
          <LevelPoint level={quizData.solvedQuizDifficulty} />
        </div>

        <div className="flex justify-center text-2xl font-bold text-center mt-7">
          <div className="text-center self-end">오늘의 퀴즈를 푸셨어요.</div>
          <img src={smart} className="w-9 h-9" alt="quiz result" />
        </div>

        <div className="m-auto w-[90%] bg-white px-4.5 rounded-3xl shadow-lg mt-8">
          <QuizDone
            content={quizData.solvedQuizTitle}
            quizAnswer={quizData.quizanswer}
            points={earnedPoints}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizDonePage;
