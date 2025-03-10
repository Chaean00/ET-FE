import useQuiz from "../../../hooks/useQuiz";
import QuizLevelPage from "./QuizLevelPage";
import QuizDonePage from "./QuizDonePage";

const QuizPage = () => {
  const { submitted } = useQuiz();

  return submitted ? <QuizDonePage /> : <QuizLevelPage />;
};

export default QuizPage;
