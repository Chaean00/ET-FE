import { useNavigate } from "react-router-dom";
import DogamTop from "../components/DogamTop";
import Dogam from "../components/Dogam";
import Footer from "../../../common/components/Footer";
import BackButton from "../../../common/components/BackButton";

const DogamPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="townbg min-h-screen flex flex-col items-center overflow-auto"
      style={{ cursor: "url('/img/custom-cursor.png'), auto" }}
    >
      <div className="absolute top-0 left-0 w-full h-12 flex items-center p-2">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain" />
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center gap-8 w-full mt-[65px]">
        <DogamTop>도감</DogamTop>
        <Dogam />
        <Dogam />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default DogamPage;
