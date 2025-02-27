import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import SectionName from "../components/SectionName";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-5">
      <SectionName className="text-lg font-bold w-[90%] flex justify-between items-center mt-5">
        회원가입
      </SectionName>

      <div className="text-md font-bold w-[90%] mt-2 mb-5 text-left">
        회원정보를 입력해주세요.
      </div>

      <div className="flex flex-col gap-2 w-[100%]">
        <CustomInput type="text" name="name" placeholder="이름을 입력해주세요.">
          이름
        </CustomInput>
        <CustomInput
          type="text"
          name="email"
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
        <CustomInput
          type="password"
          name="confirm-password"
          placeholder="비밀번호를 한 번 더 입력해주세요."
        >
          비밀번호 확인
        </CustomInput>
      </div>

      <div className="w-full flex flex-col items-center mt-auto mb-5 gap-2 p-5 bg-white">
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
