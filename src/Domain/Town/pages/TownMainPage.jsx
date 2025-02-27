import { useState, useEffect } from "react";
import TownCharacters from "../components/TownCharacters";
import GaugeBar from "../components/GaugeBar";
import TownBottom from "../components/TownBottom";
import Footer from "../../../common/components/Footer";
import PetAcqModal from "../components/PetAcqModal";

const TownMainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="townbg relative w-full h-screen overflow-hidden">
      {isModalOpen && (
        <PetAcqModal
          isOpen={isModalOpen}
          petName={"원숭이"}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="absolute top-12 left-0 w-full flex justify-center px-0 z-20 py-2">
        <GaugeBar value={2} maxValue={35} className="w-full max-w-[90%]" />
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
