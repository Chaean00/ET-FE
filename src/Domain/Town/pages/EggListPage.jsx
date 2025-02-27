import { useState, useEffect } from "react";
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

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="townbg min-h-screen flex flex-col items-center">
      {isModalOpen && (
        <StockAcqModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stockName={"삼성전자"}
          stockAmount={0.0002}
        />
      )}

      <div className="flex flex-col items-center gap-4 w-full mt-4">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain cursor-pointer" />
        </span>{" "}
        <EggList />
      </div>

      <div className="mt-4">
        <span
          onClick={() => {
            navigate("/draw");
          }}
        >
          <Button variant="large" color="black">
            <span>알뽑으러 가기</span>
            <img src={egg} className="h-6 object-contain" />
          </Button>
        </span>
      </div>

      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default EggListPage;
