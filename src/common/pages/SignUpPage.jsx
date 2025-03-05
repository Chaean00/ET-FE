import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import SectionName from "../components/SectionName";
import { signup } from "../../utils/auth";
import api from "../../utils/api";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUidAvailable, setIsUidAvailable] = useState(null);

  const checkDuplicateUid = async () => {
    if (!uid || uid.length < 4 || uid.includes(" ")) {
      setError("아이디는 공백 없이 4글자 이상이어야 합니다.");
      return;
    }

    try {
      const response = await api.post("/users/duplicate", { uid });
      setIsUidAvailable(!response.data);
      console.log(response.data);
    } catch (error) {
      console.error("중복 체크 실패:", error);
      setError(
        error.response?.data?.message ||
          "아이디 중복 체크 중 오류가 발생했습니다."
      );
    }
  };

  const handleSignUp = async () => {
    setError("");

    if (!uid || !password || !confirmPassword || !name) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (
      uid.includes(" ") ||
      password.includes(" ") ||
      uid.length < 4 ||
      password.length < 4
    ) {
      setError("아이디와 비밀번호는 공백 없이 4글자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (isUidAvailable === false) {
      setError("이미 사용 중인 아이디입니다.");
      return;
    }

    try {
      setLoading(true);
      await signup(uid, password, name);
      console.log("회원가입 성공");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setError(error.response?.data?.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-cursor min-h-screen flex flex-col items-center p-5">
      <SectionName className="text-lg font-bold w-[100%] flex items-center">
        회원가입
      </SectionName>

      <div className="text-lg font-bold w-[100%] mt-2 mb-5 text-left">
        회원정보를 입력해주세요.
      </div>

      <div className="mt-2 flex flex-col gap-2 w-[100%]">
        <CustomInput
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요."
        >
          이름
        </CustomInput>
        <div className="relative">
          <CustomInput
            type="text"
            name="uid"
            value={uid}
            onChange={(e) => {
              setUid(e.target.value);
              setIsUidAvailable(null);
            }}
            placeholder="아이디를 입력해주세요."
          >
            아이디
            <span
              className="text-blue-600 float-right cursor-pointer"
              onClick={checkDuplicateUid}
            >
              <button>중복체크</button>
            </span>
          </CustomInput>
          {isUidAvailable === true && (
            <p className="text-blue-600 text-sm mt-1 ml-2">
              사용 가능한 아이디입니다.
            </p>
          )}
          {isUidAvailable === false && (
            <p className="text-red-600 text-sm mt-1 ml-2">
              사용 불가능한 아이디입니다.
            </p>
          )}
        </div>
        <CustomInput
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
        >
          비밀번호
        </CustomInput>
        <CustomInput
          type="password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 한 번 더 입력해주세요."
        >
          비밀번호 확인
        </CustomInput>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="w-full flex flex-col items-center gap-1 fixed bottom-[20px]">
        <Button
          variant="large"
          color="blue"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "회원가입 중..." : "회원가입"}
        </Button>
        <Link to="/login" className="text-xs text-blue-500 no-underline">
          이미 Trade Town 계정이 있으신가요?
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
