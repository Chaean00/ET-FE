import { useNavigate } from "react-router-dom";
import BackButton from "../../../common/components/BackButton";
import SearchFriend from "../components/SearchFriend";
import FriendList from "../components/FriendList";
import Footer from "../../../common/components/Footer";

const FriendPage = () => {
  const navigate = useNavigate();
  return (
    <div className="custom-cursor townbg min-h-screen flex flex-col">
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain cursor-pointer" />
        </span>
        <div className="w-full">
          <SearchFriend />
        </div>
      </div>

      <div className="w-[85%] mt-[-65px] flex justify-center">
        <FriendList />
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default FriendPage;
