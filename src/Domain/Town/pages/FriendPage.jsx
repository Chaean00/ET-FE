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

  // 전체 친구 목록 불러오기
  const fetchFriends = useCallback(async () => {
    try {
      const response = await api.get("/users/subscription");
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
  }, []);

  // 검색 API 호출 (debounce 적용 전 기본 함수)
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
  }, []);

  // searchFriendsHandler를 debounce로 감싸서 300ms 후 실행 (의존성에 searchFriendsHandler 추가)
  const debouncedSearchFriends = useMemo(
    () => debounce(searchFriendsHandler, 300),
    [searchFriendsHandler]
  );

  // 컴포넌트 마운트 시 전체 친구 목록 호출
  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  // 친구 추가 후 처리 (검색어 초기화 및 전체 친구 목록 재조회)
  const handleFriendAdded = useCallback(() => {
    setSearchTerm("");
    fetchFriends();
  }, [fetchFriends]);

  return (
    <div className="relative h-screen overflow-hidden custom-cursor townbg">
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

      <div className="scrollbar-custom absolute top-20 left-0 right-0 bottom-20 overflow-y-auto px-4">
        <FriendList friends={friends} onFriendAdded={handleFriendAdded} />
      </div>
    </div>
  );
};

export default FriendPage;
