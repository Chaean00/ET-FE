import { useNavigate } from "react-router-dom";

const MyLogOutBtn = () => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer text-gray-600 rounded-3xl font-bold"
      onClick={() => {
        navigate("/login");
      }}
    >
      로그아웃
    </div>
  );
};

export default MyLogOutBtn;
