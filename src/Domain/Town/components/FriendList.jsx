import { useNavigate } from "react-router-dom";
import monkey from "../../../assets/animals/monkey.png";

const FriendList = () => {
  const navigate = useNavigate();
  const friendsData = [
    { id: 1, name: "라수빈", isFriend: true },
    { id: 2, name: "이나민", isFriend: true },
    { id: 3, name: "양일교", isFriend: false },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {friendsData.map((friend) => (
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
            <span className="text-md text-gray-800 font-bold">
              {friend.name}
            </span>
          </div>

          {friend.isFriend ? (
            <button
              className="cursor-pointer text-sm font-semibold bg-blue-500 text-white px-4 py-1 rounded-2xl hover:bg-blue-600"
              onClick={() => {
                navigate("/friendtown");
              }}
            >
              목장 보기
            </button>
          ) : (
            <button
              className="text-sm font-bold bg-red-500 text-white px-4 py-1 rounded-2xl hover:bg-red-600"
              onClick={() => {
                navigate("/friendtown");
              }}
            >
              친구 추가
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendList;
