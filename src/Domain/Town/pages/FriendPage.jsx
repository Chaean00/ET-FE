import { useNavigate } from "react-router-dom";
import BackButton from "../../../common/components/BackButton";
import SearchFriend from "../components/SearchFriend";
import FriendList from "../components/FriendList";
import Footer from "../../../common/components/Footer";

const FriendPage = () => {
  const navigate = useNavigate();
  return (
    <div className="townbg">
      <div>
        <span onClick={() => navigate(-1)}>
          <BackButton />
        </span>
        <SearchFriend />
      </div>
      <div>
        <FriendList />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default FriendPage;
