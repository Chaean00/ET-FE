import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../common/components/BackButton";
import SearchFriend from "../components/SearchFriend";
import FriendList from "../components/FriendList";
import Footer from "../../../common/components/Footer";
import api from "../../../utils/api";

const FriendPage = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);

  const fetchFriends = async (uid) => {
    if (!uid) {
      setFriends([]);
      return;
    }

    try {
      const response = await api.get(`/users/search?uid=${uid}`);
      if (response.data) {
        setFriends([
          {
            id: response.data.uid,
            name: response.data.name,
            isFriend: response.data.subscribed,
          },
        ]);
      } else {
        setFriends([]);
      }
    } catch (error) {
      console.error("검색 실패:", error);
      setFriends([]);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden custom-cursor townbg">
      <div className="absolute top-4 left-4 right-4 flex items-center z-10 bg-transparent">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain cursor-pointer" />
        </span>
        <div className="w-full">
          <SearchFriend onSearch={fetchFriends} />
        </div>
      </div>

      <div className="scrollbar-custom absolute top-20 left-0 right-0 bottom-20 overflow-y-auto px-4">
        <FriendList friends={friends} />
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50">
        <Footer />
      </div>
    </div>
  );
};

export default FriendPage;
