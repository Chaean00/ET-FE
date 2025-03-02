import { useNavigate } from "react-router-dom";
import BackButton from "../../../common/components/BackButton";
import FriendTop from "../components/FriendTop";
import TownCharacters from "../components/TownCharacters";
import Footer from "../../../common/components/Footer";

const FriendTownPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="townbg min-h-screen flex flex-col"
      style={{ cursor: "url('/img/custom-cursor.png'), auto" }}
    >
      <div className="mt-1.5 absolute top-4 left-4 right-4 z-10 flex items-center">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain cursor-pointer" />
        </span>

        <div className="absolute left-1/2 -translate-x-1/2">
          <FriendTop name={"이나민"} />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <TownCharacters />
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default FriendTownPage;
