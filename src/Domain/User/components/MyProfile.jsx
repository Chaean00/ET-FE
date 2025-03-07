import { useState, useEffect } from "react";
import api from "../../../utils/api";

const MyProfile = () => {
  const [userData, setUserData] = useState({ uid: "", name: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/users");
        const { uid, name } = response.data;
        setUserData({ uid: uid, name: name });
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full bg-white shadow-md rounded-xl px-4 py-8 max-w-sm">
      <div className="text-xl font-bold text-black">{userData.name}</div>
      <div className="text-xs text-gray-400">{userData.uid}</div>
    </div>
  );
};

export default MyProfile;
