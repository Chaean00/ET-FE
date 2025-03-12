import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyChart from "../components/MyChart";
import MyTable from "../components/MyTable";
import Footer from "../../../common/components/Footer";
import BackButton from "../../../common/components/BackButton";
import api from "../../../utils/api";

const MyStockPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.get("/users");
        setName(userResponse.data.name || "사용자");

        const pointsResponse = await api.get("/users/points");
        setPoints(pointsResponse.data.point || 0);
      } catch (error) {
        console.error(
          "데이터 불러오기 실패:",
          error.response?.data || error.message
        );
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="scrollbar-custom flex-1 overflow-y-auto flex flex-col items-center h-screen px-4 pt-6 pb-28">
      <div className="w-full max-w-md flex items-center relative">
        <span onClick={() => navigate(-1)} className="absolute left-0">
          <BackButton className="w-8 h-8" />
        </span>
      </div>

      <h1 className="font-bold text-2xl mt-8 w-full max-w-md self-start ml-2">
        보유 주식
      </h1>

      <div className="w-full max-w-md flex justify-center mt-4">
        <MyChart />
      </div>

      <div className="w-full shadow-md rounded-xl max-w-md mt-1 p-3">
        <MyTable />
      </div>

      <div className="w-full max-w-md mt-4 space-y-4">
        <div className="text-sm bg-white shadow-md rounded-xl py-5 w-full text-center">
          <span className="font-bold">{name}</span> 님의 보유 포인트🏅는
          <span className="font-bold"> {points.toLocaleString()}P</span>입니다.
        </div>
      </div>

      <Footer className="fixed bottom-0 w-full max-w-md bg-white border-t" />
    </div>
  );
};

export default MyStockPage;
