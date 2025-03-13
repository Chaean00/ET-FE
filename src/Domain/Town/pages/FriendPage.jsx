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

  useEffect(() => {
    if (searchTerm == "") {
      fetchFriends();
    }
  }, [searchTerm]);

  const fetchFriends = async () => {
    try {
      const response = await api.get(`/users/subscription`);
      if (response.data && response.data.friends) {
        const myFriends = response.data.friends.map((friend) => ({
          id: friend.id,
          uid: friend.uid,
          name: friend.name,
          isFriend: true
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

    try {
      const response = await api.get(
        `/users/search?uid=${encodeURIComponent(trimmedUid)}`
      );

      if (response.status === 200 && response.data) {
        const friend = response.data;

        const searchedFriends = [
          {
            id: friend.id,
            uid: friend.uid,
            name: friend.name,
            isFriend: friend.subscribed // 이미 구독한 상태인지 확인
          }
        ];

        setFriends(searchedFriends);
      } else if (response.status === 500) {
        setFriends([]);
      }
    } catch (error) {
      setFriends([]);
      console.error("검색 실패:", error.response?.data || error.message);
    }
  };

  const handleFriendAdded = () => {
    setSearchTerm("");
    fetchFriends();
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
          <SearchFriend onSearch={searchFriends} searchTerm={searchTerm} />
        </div>
      </div>

      <div className="scrollbar-custom absolute top-20 left-0 right-0 bottom-20 overflow-y-auto px-4">
        <FriendList friends={friends} onFriendAdded={handleFriendAdded} />
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50">
        <Footer />
      </div>
    </div>
  );
};

export default FriendPage;
