import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DogamTop from "../components/DogamTop";
import Dogam from "../components/Dogam";
import Footer from "../../../common/components/Footer";
import BackButton from "../../../common/components/BackButton";
import api from "../../../utils/api";

const DogamPage = () => {
  const navigate = useNavigate();
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    const fetchPetDex = async () => {
      try {
        const response = await api.get("/users/pets/unique");

        if (Array.isArray(response.data) && response.data.length > 0) {
          setPetList(response.data);
        } else {
          console.warn("도감 데이터 없음");
          setPetList([]);
        }
      } catch (error) {
        console.error(
          "도감 불러오기 실패:",
          error.response?.data || error.message
        );
        setPetList([]);
      }
    };

    fetchPetDex();
  }, []);

  return (
    <div className="scrollbar-custom flex-1 overflow-y-auto custom-cursor townbg min-h-screen flex flex-col items-center pb-32">
      <div className="absolute top-0 left-0 w-full h-12 flex items-center p-2">
        <span onClick={() => navigate(-1)}>
          <BackButton className="custom-cursor-pointer w-8 h-8 object-contain" />
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center gap-8 w-full mt-[65px]">
        <DogamTop>도감</DogamTop>
        <Dogam petList={petList} />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default DogamPage;
