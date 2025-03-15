import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import monkey from "../../../assets/animals/monkey1.png";
import api from "../../../utils/api";

const FriendList = ({ friends = [], onFriendAdded }) => {
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState(friends);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFriendList(friends);
    if (friends.length > 0) {
      setIsLoading(false);
    } else {
      setTimeout(() => setIsLoading(false), 100);
    }
  }, [friends]);

  const handleAddFriend = async (friendId) => {
    try {
      const response = await api.post("/users/subscription", {
        subscribedId: friendId,
      });

      if (response.status === 200) {
        setFriendList((prev) =>
          prev.map((friend) =>
            friend.id === friendId ? { ...friend, isFriend: true } : friend
          )
        );

        onFriendAdded();
      }
    } catch (error) {
      console.error("친구 추가 실패:", error);
      alert("친구 추가에 실패했습니다.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {isLoading ? (
        <p className="text-center text-gray-500">로딩 중...</p>
      ) : friendList.length === 0 ? (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        friendList.map((friend) => (
          <div
            key={friend.id}
            className="bg-white rounded-lg p-4 flex items-center justify-between shadow"
          >
            <div className="flex items-center space-x-3">
              <img
                src={monkey}
                alt="친구 아이콘"
                className="w-8 h-8 object-contain"
              />
              <div>
                <span className="text-md text-gray-800 font-bold">
                  {friend.name}
                </span>
                <p className="text-sm text-gray-500">{friend.uid}</p>
              </div>
            </div>

            {friend.isFriend ? (
              <button
                className="cursor-pointer text-sm font-semibold bg-blue-500 text-white px-4 py-1 rounded-2xl hover:bg-blue-600"
                onClick={() =>
                  navigate("/friendtown", {
                    state: { name: friend.name, id: friend.id },
                  })
                }
              >
                마을 보기
              </button>
            ) : (
              <button
                className="text-sm font-bold bg-red-500 text-white px-4 py-1 rounded-2xl hover:bg-red-600"
                onClick={() => handleAddFriend(friend.id)}
              >
                친구 추가
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FriendList;
