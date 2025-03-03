import { useNavigate } from "react-router-dom";
import MyTrade from "../components/MyTrade";
import Footer from "../../../common/components/Footer";
import BackButton from "../../../common/components/BackButton";

const MyTradePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-6 pb-20">
      <div className="w-full max-w-md flex items-center relative">
        <span onClick={() => navigate(-1)} className="absolute left-0">
          <BackButton className="w-8 h-8" />
        </span>
      </div>

      <h1 className="font-bold text-2xl ml-2 mt-8 mb-[-35px] w-full max-w-md self-start">
        거래 내역
      </h1>

      <div className="w-full max-w-md px-2 space-y-4 mt-4">
        <MyTrade />
      </div>

      <Footer className="fixed bottom-0 w-full max-w-md bg-white border-t" />
    </div>
  );
};

export default MyTradePage;
