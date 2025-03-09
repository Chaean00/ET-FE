import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../../utils/auth";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import SectionName from "../components/SectionName";
import loginlogo from "../../assets/tradetown/loginlogo.png";

const LogInPage = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!uid || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      sessionStorage.removeItem("loadingShown");
      setLoading(true);
      await login(uid, password);
      console.log("로그인 성공");
      navigate("/town", { state: { from: "/login" } });
    } catch (error) {
      console.error("로그인 실패:", error);
      setError(error.response?.data?.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-cursor min-h-screen flex flex-col items-center p-5">
      <SectionName className="text-lg font-bold w-full items-center">
        로그인
      </SectionName>

      <motion.div
        className="mt-12.5 mb-4 scale-84"
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0, -35, 0, -18, 0] }}
        transition={{
          duration: 1.6,
          ease: "easeOut",
        }}
      >
        <img src={loginlogo} alt="login logo" />
      </motion.div>

      <div className="flex flex-col gap-2 w-[100%]">
        <CustomInput
          type="text"
          name="uid"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          placeholder="아이디를 입력해주세요."
        >
          아이디
        </CustomInput>
        <CustomInput
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
        >
          비밀번호
        </CustomInput>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="w-full flex flex-col items-center gap-1 fixed bottom-[20px]">
        <Button
          variant="large"
          color="blue"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </Button>
        <Link to="/signup" className="text-xs text-blue-500 no-underline">
          아직 Trade Town 계정이 없으신가요?
        </Link>
      </div>
    </div>
  );
};

export default LogInPage;
