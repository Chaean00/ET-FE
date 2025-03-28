import { useNavigate } from "react-router-dom";

const QuizLevel = () => {
  const navigate = useNavigate();

  const quizLevels = [
    { id: 1, name: "매우어려움", icon: "👺", points: 100, difficulty: "TOP" },
    { id: 2, name: "어려움", icon: "🎭", points: 70, difficulty: "HIGH" },
    { id: 3, name: "적당함", icon: "🐵", points: 50, difficulty: "MEDIUM" },
    { id: 4, name: "쉬움", icon: "🍅", points: 10, difficulty: "LOW" },
  ];

  return (
    <div className="w-full space-y-4.5">
      {quizLevels.map((level) => (
        <div
          key={level.id}
          className="cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-105 bg-blue-600 text-white rounded-xl px-5 py-8 flex justify-between items-center"
          onClick={() => navigate(`/todayquiz?difficulty=${level.difficulty}`)}
        >
          <div className="font-medium flex items-center space-x-2">
            <span className="text-lg">{level.icon}</span>
            <span className="text-lg font-bold">{level.name}</span>
          </div>
          <span className="text-sm">
            <span>지급 포인트:</span> {level.points}p
          </span>
        </div>
      ))}
    </div>
  );
};

export default QuizLevel;
