import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../../utils/auth";

const MyLogOutBtn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogOut = async () => {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "로그아웃 실패"
      );
    }
  };

  return (
    <div
      className="cursor-pointer text-gray-700 text-sm font-bold"
      onClick={() => {
        handleLogOut();
      }}
    >
      Log Out
    </div>
  );
};

export default MyLogOutBtn;
