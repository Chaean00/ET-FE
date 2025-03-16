import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../common/components/Button";
import DrawTop from "../components/DrawTop";
import EggAcqModal from "../components/EggAcqModal";
import BackButton from "../../../common/components/BackButton";
import api from "../../../utils/api";
import draweggs from "../../../assets/egg/draweggs.png";
import twinkle from "../../../assets/town/twinkle.png";

const DrawPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [point, setPoint] = useState(0);
  const [eggData, setEggData] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await api.get("/users/points");

        if (response.data && typeof response.data.point === "number") {
          setPoint(response.data.point);
        } else {

        }
      } catch (error) {
      }
    };

    fetchPoints();
  }, []);

  const handleDrawEgg = async () => {
    if (point < 500) {
      alert("포인트가 부족합니다!");
      return;
    }

    try {
      const response = await api.post("/eggs");

      if (response.status === 201 && response.data) {
        setEggData(response.data);
        setIsModalOpen(true);
        setPoint((prev) => prev - 500);
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <div className="custom-cursor drawbg min-h-screen flex flex-col items-center">
      {isModalOpen && eggData && (
        <EggAcqModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="absolute top-4 left-4 z-10" onClick={() => navigate(-1)}>
        <BackButton className="w-8 h-8 object-contain cursor-pointer" />
      </div>
      <div className="mt-16">
        <DrawTop point={point}>알뽑기</DrawTop>
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
      <div className="w-full text-center font-bold absolute bottom-[75px]">
        <span onClick={handleDrawEgg}>
          <Button variant={"large"} color={"black"}>
            500 포인트로 뽑기!
          </Button>
        </span>
      </div>
    </div>
  );
};

export default DrawPage;
