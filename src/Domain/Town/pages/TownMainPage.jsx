import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TownCharacters from "../components/TownCharacters";
import GaugeBar from "../components/GaugeBar";
import TownBottom from "../components/TownBottom";
import Footer from "../../../common/components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { getUserHistory } from "../../../utils/history";
import { getPets } from "../../../utils/pets";

// 🔥 동물 이미지 불러오기
import monkey from "../../../assets/animals/monkey1.png";
import chicken from "../../../assets/animals/chicken1.png";
import cow from "../../../assets/animals/cow2.png";
import dog from "../../../assets/animals/dog2.png";
import dragon from "../../../assets/animals/dragon2.png";
import tiger from "../../../assets/animals/tiger1.png";
import snake from "../../../assets/animals/snake1.png";
import pig from "../../../assets/animals/pig1.png";
import rabbit from "../../../assets/animals/rabbit1.png";
import sheep from "../../../assets/animals/sheep1.png";

// 🔥 더미 데이터 추가
const dummyChars = [
  { id: 1, image: monkey, position: { x: 50, y: 50 } },
  { id: 2, image: chicken, position: { x: 100, y: 200 } },
  { id: 3, image: cow, position: { x: 300, y: 150 } },
  { id: 4, image: dog, position: { x: 250, y: 350 } },
  { id: 5, image: dragon, position: { x: 400, y: 100 } },
  { id: 6, image: tiger, position: { x: 150, y: 250 } },
  { id: 7, image: snake, position: { x: 350, y: 300 } },
  { id: 8, image: pig, position: { x: 200, y: 50 } },
  { id: 9, image: rabbit, position: { x: 450, y: 200 } },
  { id: 10, image: sheep, position: { x: 500, y: 400 } },
];

const TownMainPage = () => {
  const [loading, setLoading] = useState(false);
  const [tradeCount, setTradeCount] = useState(5);
  const [charList, setCharList] = useState(dummyChars); // 🔥 기본값을 더미 데이터로 설정
  const location = useLocation();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await getPets();
        const newChars = pets.map((pet) => ({
          id: pet.pet_id,
          image: pet.image_url,
          position: getRandomPosition(),
        }));
        setCharList(newChars);
      } catch (error) {
        console.error("펫 데이터 불러오기 실패:", error);
      }
    };
    fetchPets();

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
