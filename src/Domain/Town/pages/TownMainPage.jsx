import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TownCharacters from "../components/TownCharacters";
import GaugeBar from "../components/GaugeBar";
import TownBottom from "../components/TownBottom";
import Footer from "../../../common/components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import PetAcqModal from "../components/PetAcqModal";
import { getUserHistory } from "../../../utils/history";
import { getPets, postPets } from "../../../utils/pets";

const TownMainPage = () => {
  const [loading, setLoading] = useState(false);
  const [tradeCount, setTradeCount] = useState(0);
  const [charList, setCharList] = useState([]);
  const [isPetNeeded, setIsPetNeeded] = useState(false);
  const [acquiredPet, setAcquiredPet] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchTradeHistory = async () => {
      const count = await getUserHistory();
      setTradeCount(count);
    };

    fetchTradeHistory();
  }, []);

  useEffect(() => {
    const checkPetRequirement = async () => {
      try {
        const pets = await getPets();
        const level = Math.floor(tradeCount / 5);
        const requiredPets = level + 1;

        setIsPetNeeded(pets.length < requiredPets);

        const newChars = pets.map((pet) => ({
          id: pet.petId,
          image: pet.img,
          position: getRandomPosition()
        }));
        setCharList(newChars);
      } catch (error) {
        console.error("펫 데이터 불러오기 실패:", error);
      }
    };

    checkPetRequirement();
  }, [tradeCount]);

  useEffect(() => {
    if (!sessionStorage.getItem("loadingShown")) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("loadingShown", "true");
      }, 2800);
    }
  }, [location]);

  const handlePetAcquisition = async () => {
    try {
      const response = await postPets();
      if (response) {
        setAcquiredPet({
          name: response.name,
          img: response.img
        });

        setTradeCount((prev) => prev + 1);

        setIsPetNeeded(false);

        const pets = await getPets();
        const level = Math.floor((tradeCount + 1) / 5);
        const requiredPets = level + 1;

        setIsPetNeeded(pets.length < requiredPets);
      }
    } catch (error) {
      console.error("펫 지급 실패:", error);
    }
  };

  return (
    <div className="custom-cursor townbg relative w-full h-screen overflow-hidden">
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <div className="absolute top-2 left-0 w-full flex justify-center px-0 z-20 py-2">
        <GaugeBar
          value={tradeCount === 0 || tradeCount % 5 !== 0 ? tradeCount % 5 : 5}
          maxValue={5}
          level={Math.floor(tradeCount / 5)}
          isPetNeeded={isPetNeeded}
          onPetAcquisition={handlePetAcquisition}
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

      {acquiredPet && (
        <PetAcqModal
          isOpen={!!acquiredPet}
          onClose={() => setAcquiredPet(null)}
          petImg={acquiredPet.img}
          petName={acquiredPet.name}
        />
      )}
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
    y: Math.max(0, Math.random() * maxHeight)
  };
}
