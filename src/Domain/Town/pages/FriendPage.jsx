import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import BackButton from "../../../common/components/BackButton";
import SearchFriend from "../components/SearchFriend";
import FriendList from "../components/FriendList";
import api from "../../../utils/api";

const FriendPage = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFriends = useCallback(async () => {
    try {
      const response = await api.get("/users/subscription");
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
  }, []);

  const searchFriendsHandler = useCallback(async (uid) => {
    const trimmedUid = uid.trim();
    if (!trimmedUid) return;

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
            isFriend: friend.subscribed,
          },
        ];
        setFriends(searchedFriends);
      } else if (response.status === 500) {
        setFriends([]);
      }
    } catch (error) {
      setFriends([]);
      console.error("검색 실패:", error.response?.data || error.message);
    }
  }, []);

  const debouncedSearchFriends = useMemo(
    () => debounce(searchFriendsHandler, 300),
    [searchFriendsHandler]
  );

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleFriendAdded = useCallback(() => {
    setSearchTerm("");
    fetchFriends();
  }, [fetchFriends]);

  return (
    <div className="relative h-screen overflow-hidden custom-cursor townbg ">
      <div className="absolute top-4 left-4 right-4 flex items-center z-10 bg-transparent">
        <span onClick={() => navigate(-1)}>
          <BackButton className="w-8 h-8 object-contain cursor-pointer" />
        </span>
        <div className="w-full">
          <SearchFriend
            onSearch={debouncedSearchFriends}
            searchTerm={searchTerm}
            fetchFriends={fetchFriends}
          />
        </div>
      </div>

      <div className="scrollbar-custom absolute top-20 left-0 right-0 bottom-20 px-4 overflow-y-auto">
        <FriendList friends={friends} onFriendAdded={handleFriendAdded} />
      </div>
    </div>
  );
};

export default FriendPage;
