import { useEffect, useState } from "react";
import QuizLevelPage from "./QuizLevelPage";
import QuizDonePage from "./QuizDonePage";

const QuizPage = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const completed = sessionStorage.getItem("quiz_completed") === "true";
    setQuizCompleted(completed);
  }, []);

  return quizCompleted ? <QuizDonePage /> : <QuizLevelPage />;
};

export default QuizPage;
