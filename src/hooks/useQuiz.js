import { useState, useEffect } from "react";

const useQuiz = () => {
  const userUid = localStorage.getItem("userUid");
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!userUid) {
    console.error("로그인 필요: userUid 없음");
    return { quizData, loading, submitted };
  }

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedQuiz = JSON.parse(
      localStorage.getItem(`${userUid}_quiz_answer`)
    );
    const lastQuizDate = localStorage.getItem(`${userUid}_quiz_date`);

    if (lastQuizDate !== today) {
      localStorage.removeItem(`${userUid}_quiz_answer`);
      localStorage.setItem(`${userUid}_quiz_date`, today);
      setSubmitted(false);
    } else if (savedQuiz) {
      setSubmitted(true);
    }

    const checkMidnightReset = () => {
      const now = new Date();
      const currentDate = now.toISOString().split("T")[0];

      if (currentDate !== localStorage.getItem(`${userUid}_quiz_date`)) {
        localStorage.removeItem(`${userUid}_quiz_answer`);
        localStorage.setItem(`${userUid}_quiz_date`, currentDate);
        setSubmitted(false);
      }
    };

    const interval = setInterval(checkMidnightReset, 60000);
    return () => clearInterval(interval);
  }, [userUid]);

  return {
    userUid,
    quizData,
    setQuizData,
    loading,
    setLoading,
    submitted,
    setSubmitted,
  };
};

export default useQuiz;
