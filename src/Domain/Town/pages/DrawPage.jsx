import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../../common/components/Button";
import DrawTop from "../components/DrawTop";
import EggAcqModal from "../components/EggAcqModal";
import BackButton from "../../../common/components/BackButton";
import Footer from "../../../common/components/Footer";
import draweggs from "../../../assets/egg/draweggs.png";
import twinkle from "../../../assets/town/twinkle.png";

const DrawPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="custom-cursor drawbg min-h-screen flex flex-col items-center">
      {isModalOpen && (
        <EggAcqModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="absolute top-4 left-4 z-10" onClick={() => navigate(-1)}>
        <BackButton className="w-8 h-8 object-contain cursor-pointer" />
      </div>
      <div className="mt-16">
        <DrawTop point={200000}>알뽑기</DrawTop>
      </div>
      <img
        src={twinkle}
        alt="star"
        className="absolute left-[-50px] w-10 h-10"
      />
      <div className="flex justify-center w-full mb-62 relative items-center">
        <img
          src={draweggs}
          className="w-auto max-w-lg transform scale-135 transition-transform duration-300 z-10"
        />
      </div>
      <div className="w-full text-center font-bold fixed bottom-[75px]">
        <span onClick={() => setIsModalOpen(true)}>
          <Button variant={"large"} color={"black"}>
            10,000 포인트로 뽑기!
          </Button>
        </span>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default DrawPage;
