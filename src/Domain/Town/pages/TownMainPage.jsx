import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TownCharacters from "../components/TownCharacters";
import GaugeBar from "../components/GaugeBar";
import TownBottom from "../components/TownBottom";
import Footer from "../../../common/components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { getUserHistory } from "../../../utils/history";
import { getPets, postPets } from "../../../utils/pets";

const TownMainPage = () => {
  const [loading, setLoading] = useState(false);
  const [tradeCount, setTradeCount] = useState(0);
  const [charList, setCharList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTradeHistory = async () => {
      const count = await getUserHistory();
      setTradeCount(count);
    };

    fetchTradeHistory();
  }, []);

  useEffect(() => {
    const fetchAndCheckPets = async () => {
      try {
        const pets = await getPets();
        console.log("현재 보유 펫:", pets);

        const level = Math.floor(tradeCount / 5);
        const requiredPets = level + 1;
        const missingPets = requiredPets - pets.length;

        if (missingPets > 0) {
          console.log(`펫이 부족합니다. ${missingPets}개 지급 요청`);
          for (let i = 0; i < missingPets; i++) {
            await postPets();
          }
        }

        const updatedPets = await getPets();
        console.log("펫 지급 후 보유 펫:", updatedPets);

        const newChars = updatedPets.map((pet) => ({
          id: pet.petId,
          image: pet.img,
          position: getRandomPosition(),
        }));
        setCharList(newChars);
      } catch (error) {
        console.error("펫 데이터 불러오기 실패:", error);
      }
    };

    fetchAndCheckPets();
  }, [tradeCount]);

  useEffect(() => {
    if (
      location.state?.from === "/login" &&
      !sessionStorage.getItem("loadingShown")
    ) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("loadingShown", "true");
      }, 2800);
    }
  }, [location]);

  return (
    <div className="custom-cursor townbg relative w-full h-screen overflow-hidden">
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      <div className="absolute top-2 left-0 w-full flex justify-center px-0 z-20 py-2">
        <GaugeBar
          value={tradeCount === 0 || tradeCount % 5 !== 0 ? tradeCount % 5 : 5}
          maxValue={5}
          level={Math.floor(tradeCount / 5)}
          className="w-full max-w-[90%]"
        />
      </div>

      <TownCharacters charList={charList} />

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

function getRandomPosition() {
  const container = document.querySelector(".townbg");
  if (!container) return { x: 0, y: 0 };

  const maxWidth = container.clientWidth - 50;
  const maxHeight = container.clientHeight - 50;

  return {
    x: Math.max(0, Math.random() * maxWidth),
    y: Math.max(0, Math.random() * maxHeight),
  };
}
