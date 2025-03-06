import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TownCharacters from "../components/TownCharacters";
import GaugeBar from "../components/GaugeBar";
import TownBottom from "../components/TownBottom";
import Footer from "../../../common/components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { getUserHistory } from "../../../utils/history";

const TownMainPage = () => {
  const [loading, setLoading] = useState(false);
  // const [tradeCount, setTradeCount] = useState(5);
  const [tradeCount, setTradeCount] = useState(5);
  const location = useLocation();

  useEffect(() => {
    // if (location.state?.from === "/login") {
    //   setLoading(true);
    //   setTimeout(() => setLoading(false), 2800);
    // }
    // const fetchTradeHistory = async () => {
    //   const count = await getUserHistory();
    //   setTradeCount(count);
    // };
    // fetchTradeHistory();
  }, [location]);

  return (
    <div className="custom-cursor townbg relative w-full h-screen overflow-hidden">
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <div className="absolute top-2 left-0 w-full flex justify-center px-0 z-20 py-2">
        <GaugeBar
          value={tradeCount == 0 || tradeCount % 5 != 0 ? tradeCount % 5 : 5}
          maxValue={5}
          level={Math.floor(tradeCount / 5)}
          className="w-full max-w-[90%]"
        />
      </div>

      <TownCharacters />

      <div className="w-full absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
        <TownBottom />
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md">
        <Footer />
      </div>
    </div>
  );
};

export default TownMainPage;
