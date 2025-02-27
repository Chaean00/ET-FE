import { useNavigate } from "react-router-dom";
import BackButton from "../../../common/components/BackButton";
import FriendTop from "../components/FriendTop";
import TownCharacters from "../components/TownCharacters";
import Footer from "../../../common/components/Footer";

const FriendTownPage = () => {
  const navigate = useNavigate();

  return (
    <div className="townbg">
      <div>
        <div>
          <span onClick={() => navigate(-1)}>
            <BackButton />
          </span>
        </div>
        <div>
          <FriendTop name={"이나민"} />
        </div>
      </div>
      <div>
        <TownCharacters />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default FriendTownPage;
