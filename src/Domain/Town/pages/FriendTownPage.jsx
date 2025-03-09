import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../../../common/components/BackButton";
import FriendTop from "../components/FriendTop";
import FriendTownCharacters from "../components/FriendTownCharacters";
import Footer from "../../../common/components/Footer";
import api from "../../../utils/api";

const FriendTownPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, id } = location.state || {};
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchPets = async () => {
      try {
        const response = await api.get(`/pets?subscribedId=${id}`);

        console.log(id + "펫 데이터 응답:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const newChars = response.data.map((pet) => ({
            id: pet.id,
            image: pet.img,
            position: getRandomPosition(),
          }));
          setPetList(newChars);
        } else {
          console.warn("펫 데이터 없음");
          setPetList([]);
        }
      } catch (error) {
        console.error(
          "펫 목록 불러오기 실패:",
          error.response?.data || error.message
        );
        setPetList([]);
      }
    };

    fetchPets();
  }, [id]);

  return (
    <div className="custom-cursor townbg min-h-screen flex flex-col">
      <div className="mt-1.5 absolute top-4 left-4 right-4 z-10 flex items-center">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain cursor-pointer" />
        </span>

        <div className="absolute left-1/2 -translate-x-1/2">
          <FriendTop name={name || "알 수 없음"} />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <FriendTownCharacters charList={petList} />
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default FriendTownPage;

function getRandomPosition() {
  const container = document.querySelector(".townbg");
  if (!container) return { x: 0, y: 0 };

  const maxWidth = container.clientWidth - 50;
  const maxHeight = container.clientHeight - 50;

  return {
    x: Math.max(0, Math.random() * maxWidth),
    y: Math.max(0, Math.random() * maxHeight),
  };
}
