import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StockAcqModal from "../components/StockAcqModal";
import EggList from "../components/EggList";
import BackButton from "../../../common/components/BackButton";
import Button from "../../../common/components/Button";
import api from "../../../utils/api";
import egg from "../../../assets/egg/egg.png";

const EggListPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [eggList, setEggList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEggs = async () => {
      try {
        const response = await api.get("/eggs");

        if (Array.isArray(response.data) && response.data.length > 0) {
          setEggList(response.data);
        } else {
          console.warn("알 데이터 없음");
          setEggList([]);
        }
      } catch (error) {
        console.error(
          "알 목록 불러오기 실패:",
          error.response?.data || error.message
        );
        setEggList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEggs();
  }, []);

  const handleHatchEgg = async (egg) => {
    try {
      const response = await api.get(`/eggs/hatching/${egg.eggId}`);

      if (response.status === 201) {
        setSelectedStock({
          stockImg: response.data.stockImg,
          stockSymbol: response.data.stockName,
          stockAmount: response.data.amount,
        });

        setEggList((prevEggs) => prevEggs.filter((e) => e.eggId !== egg.eggId));

        setIsModalOpen(true);
      } else {
        console.warn("부화 실패");
      }
    } catch (error) {
      console.error("알 부화 실패:", error.response?.data || error.message);
    }
  };

  return (
    <div className="scrollbar-custom flex-1 overflow-y-auto custom-cursor townbg min-h-screen flex flex-col relative pb-35">
      {isModalOpen && selectedStock && (
        <StockAcqModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stockImg={selectedStock.stockImg}
          stockName={selectedStock.stockSymbol}
          stockAmount={selectedStock.stockAmount}
        />
      )}

      <div className="absolute top-4 left-4 z-10" onClick={() => navigate(-1)}>
        <BackButton className="w-8 h-8 object-contain cursor-pointer" />
      </div>

      <div className="mt-16 z-0 w-full flex flex-col items-center gap-0">
        {isLoading ? (
          <p className="text-lg font-bold text-gray-700 mt-10">로딩 중...</p>
        ) : (
          <EggList eggs={eggList} onHatchEgg={handleHatchEgg} />
        )}

        <div className="z-10 w-full flex justify-center fixed bottom-[75px]">
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
    </div>
  );
};

export default EggListPage;
