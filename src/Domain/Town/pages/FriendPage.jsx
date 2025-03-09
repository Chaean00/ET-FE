import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../common/components/BackButton";
import SearchFriend from "../components/SearchFriend";
import FriendList from "../components/FriendList";
import Footer from "../../../common/components/Footer";
import api from "../../../utils/api";

const FriendPage = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFriends = async () => {
    try {
      const response = await api.get(`/users/subscription`);
      if (response.data && response.data.friends) {
        const myFriends = response.data.friends.map((friend) => ({
          id: friend.id,
          uid: friend.uid,
          name: friend.name,
          isFriend: true,
        }));
        setFriends(myFriends);
      } else {
        setFriends([]);
      }
    } catch (error) {
      console.error("내 친구 목록 불러오기 실패:", error);
      setFriends([]);
    }
  };

  const searchFriends = async (uid) => {
    const trimmedUid = uid.trim();
    setSearchTerm(trimmedUid);

    if (trimmedUid.length < 2) {
      fetchFriends();
      return;
    }

    try {
      const response = await api.get(
        `/users/search?uid=${encodeURIComponent(trimmedUid)}`
      );

      if (response.status === 200 && response.data) {
        const friend = response.data;

        const isExistingFriend = friends.some((f) => f.id === friend.id);

        const searchedFriends = [
          {
            id: friend.id,
            uid: friend.uid,
            name: friend.name,
            isFriend: isExistingFriend || !!friend.subscribed,
          },
        ];

        setFriends(searchedFriends);
      } else {
        console.warn("검색 결과 없음");
        setFriends([]);
      }
    } catch (error) {
      console.error("검색 실패:", error.response?.data || error.message);
      setFriends([]);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="relative h-screen overflow-hidden custom-cursor townbg">
      <div className="absolute top-4 left-4 right-4 flex items-center z-10 bg-transparent">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain cursor-pointer" />
        </span>
        <div className="w-full">
          <SearchFriend onSearch={searchFriends} />
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
