import { useNavigate } from "react-router-dom";
import tomato from "../../../assets/animals/tomato.png";

const QuizLevel = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div onClick={() => navigate("/todayquiz")}>
        <div>
          매우어려움
          <img src={tomato} />
        </div>
        <div>
          지급 포인트: <span>100p</span>
        </div>
      </div>
      <div onClick={() => navigate("/todayquiz")}>
        <div>
          어려움
          <img src={tomato} />
        </div>
        <div>
          지급 포인트:<span>70p</span>
        </div>
      </div>
      <div onClick={() => navigate("/todayquiz")}>
        <div>
          적당함
          <img src={tomato} />
        </div>
        <div>
          지급 포인트: <span>50p</span>
        </div>
      </div>
      <div onClick={() => navigate("/todayquiz")}>
        <div>
          쉬움
          <img src={tomato} />
        </div>
        <div>
          지급 포인트: <span>10p</span>
        </div>
      </div>
    </div>
  );
};
export default QuizLevel;
