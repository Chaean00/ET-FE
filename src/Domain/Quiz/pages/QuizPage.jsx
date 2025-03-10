import { useEffect, useState } from "react";
import QuizLevelPage from "./QuizLevelPage";
import QuizDonePage from "./QuizDonePage";

const QuizPage = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const savedQuiz = JSON.parse(sessionStorage.getItem("quiz_answer"));

    if (
      savedQuiz &&
      savedQuiz.quizId !== undefined &&
      savedQuiz.userAnswer !== undefined
    ) {
      setQuizCompleted(true);
    } else {
      setQuizCompleted(false);
    }

    const checkMidnightReset = () => {
      const lastReset = localStorage.getItem("lastResetTime");
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);

      if (!lastReset || new Date(lastReset) < midnight) {
        sessionStorage.clear();
        localStorage.setItem("lastResetTime", now.toISOString());
        setQuizCompleted(false);
      }
    };

    checkMidnightReset();

    const interval = setInterval(() => {
      checkMidnightReset();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return quizCompleted ? <QuizDonePage /> : <QuizLevelPage />;
};

export default QuizPage;
