import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import SectionName from "../components/SectionName";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-5">
      <SectionName className="text-lg font-bold w-[100%] flex items-center">
        회원가입
      </SectionName>

      <div className="text-lg font-bold w-[100%] mt-2 mb-5 text-left">
        회원정보를 입력해주세요.
      </div>

      <div className="mt-2 flex flex-col gap-2 w-[100%]">
        <CustomInput type="text" name="name" placeholder="이름을 입력해주세요.">
          이름
        </CustomInput>
        <CustomInput
          type="text"
          name="email"
          placeholder="아이디를 입력해주세요."
        >
          아이디
        </CustomInput>
        <CustomInput
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
        >
          비밀번호
        </CustomInput>
        <CustomInput
          type="password"
          name="confirm-password"
          placeholder="비밀번호를 한 번 더 입력해주세요."
        >
          비밀번호 확인
        </CustomInput>
      </div>
      <div className="w-full flex flex-col items-center gap-1 fixed bottom-[20px]">
        <Button variant="large" color="blue">
          회원가입
        </Button>
        <Link to="/login" className="text-xs text-blue-500 no-underline">
          이미 Trade Town 계정이 있으신가요?
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
