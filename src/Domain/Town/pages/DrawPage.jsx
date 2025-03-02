import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../common/components/Button";
import DrawTop from "../components/DrawTop";
import EggAcqModal from "../components/EggAcqModal";
import BackButton from "../../../common/components/BackButton";
import Footer from "../../../common/components/Footer";
import draweggs from "../../../assets/egg/draweggs.png";

const DrawPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="townbg min-h-screen flex flex-col items-center"
      style={{ cursor: "url('/img/custom-cursor.png'), auto" }}
    >
      {isModalOpen && (
        <EggAcqModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="absolute top-4 left-4 z-10" onClick={() => navigate(-1)}>
        <BackButton className="w-8 h-8 object-contain cursor-pointer" />
      </div>

      <div className="mt-10">
        <DrawTop point={2000000}>알뽑기</DrawTop>
      </div>

      <div className="flex justify-center w-full mb-25">
        <img
          src={draweggs}
          className="w-auto max-w-lg transform scale-125 transition-transform duration-300"
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
