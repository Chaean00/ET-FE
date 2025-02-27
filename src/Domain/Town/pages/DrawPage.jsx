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
    <div className="townbg">
      {isModalOpen && (
        <EggAcqModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div>
        <span
          onClick={() => {
            navigate(-1);
          }}
        >
          <BackButton />
        </span>
      </div>
      <div>
        <DrawTop point={2000000}>알뽑기</DrawTop>
      </div>
      <div>
        <img src={draweggs} />
      </div>
      <div>
        <span onClick={() => setIsModalOpen(true)}>
          <Button variant={"large"} color={"black"}>
            10,000포인트로 뽑기
          </Button>
        </span>
      </div>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};
export default DrawPage;
