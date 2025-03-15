import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyTrade from "../components/MyTrade";
import BackButton from "../../../common/components/BackButton";
import api from "../../../utils/api";

const MyTradePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [trades, setTrades] = useState([]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden flex flex-col items-center pb-10">
      <div className="w-full max-w-md mx-auto flex items-center relative pt-6">
        <span onClick={() => navigate(-1)} className="absolute left-0">
          <BackButton className="w-8 h-8" />
        </span>
      </div>

      <h1 className="font-bold text-2xl ml-2 mt-8 w-full max-w-md mx-auto">
        거래 내역
      </h1>

      <div className="mt-5 w-full max-w-md px-2 space-y-4 mx-auto mb-10">
        <MyTrade trades={trades} />
      </div>
    </div>
  );
};

export default MyTradePage;
