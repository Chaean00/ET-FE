import { useNavigate } from "react-router-dom";
import MyTrade from "../components/MyTrade";
import Footer from "../../../common/components/Footer";
import BackButton from "../../../common/components/BackButton";

const MyTradePage = () => {
  const navigate = useNavigate();

  return (
    <div className="scrollbar-custom overflow-y-auto overflow-x-hidden h-screen flex flex-col items-center pb-6">
      <div className="w-full max-w-md mx-auto flex items-center relative pt-6">
        <span onClick={() => navigate(-1)} className="absolute left-0">
          <BackButton className="w-8 h-8" />
        </span>
      </div>

      <h1 className="font-bold text-2xl ml-2 mt-8 w-full max-w-md mx-auto">
        거래 내역
      </h1>

      <div className="mt-5 w-full max-w-md px-2 space-y-4 mx-auto mb-28">
        <MyTrade />
      </div>

      <div className="fixed bottom-0 left-0 w-full max-w-md mx-auto bg-white border-t">
        <Footer />
      </div>
    </div>
  );
};

export default MyTradePage;
