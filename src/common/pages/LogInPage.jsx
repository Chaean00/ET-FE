import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import SectionName from "../components/SectionName";
import loginlogo from "../../assets/tradetown/loginlogo.png";

import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-5">
      <SectionName className="text-lg font-bold w-[90%] flex justify-between items-center">
        로그인
      </SectionName>

      <motion.div
        className="mt-10 scale-125"
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
          name="name"
          placeholder="이메일을 입력해주세요."
        >
          이메일
        </CustomInput>
        <CustomInput
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
        >
          비밀번호
        </CustomInput>
      </div>

      <div className="w-full flex flex-col items-center mt-1 mb-5 gap-2 p-5 bg-white">
        <Button variant="large" color="blue" onClick={() => navigate("/town")}>
          로그인
        </Button>
        <Link to="/signup" className="text-xs text-blue-500 no-underline">
          아직 Trade Town 계정이 없으신가요?
        </Link>
      </div>
    </div>
  );
};

export default LogInPage;
