import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StockAcqModal from "../components/StockAcqModal";
import EggList from "../components/EggList";
import BackButton from "../../../common/components/BackButton";
import Footer from "../../../common/components/Footer";
import Button from "../../../common/components/Button";
import egg from "../../../assets/egg/egg.png";

const EggListPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="townbg min-h-screen flex flex-col relative"
      style={{ cursor: "url('/img/custom-cursor.png'), auto" }}
    >
      {isModalOpen && (
        <StockAcqModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stockName={"삼성전자"}
          stockAmount={0.0002}
        />
      )}

      <div className="absolute top-4 left-4 z-10" onClick={() => navigate(-1)}>
        <BackButton className="w-8 h-8 object-contain cursor-pointer" />
      </div>
      <div
        className="mt-2 w-full flex flex-col items-center gap-0"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <EggList className="w-full max-w-md" />

        <div className="w-full flex justify-center fixed bottom-[75px]">
          <Button
            variant="medium"
            color="black"
            className="flex items-center justify-center gap-1"
            onClick={() => navigate("/draw")}
          >
            <span>알뽑으러 가기</span>
            <img src={egg} className="h-6 object-contain" />
          </Button>
        </div>
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default EggListPage;
