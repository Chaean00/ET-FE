import { useState, useEffect } from "react";
import api from "../../../utils/api";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    uid: "",
    name: "",
    account: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, accountResponse] = await Promise.all([
          api.get("/users"),
          api.get("/users/account"),
        ]);

        const { uid, name } = userResponse.data;
        const { account } = accountResponse.data;

        setUserData({ uid, name, account });
      } catch (error) {
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full bg-white shadow-md rounded-xl px-4 py-8 space-y-1 max-w-sm">
      <div className="text-xl font-bold text-black">{userData.name}</div>
      <div className="text-sm text-gray-400">{userData.uid}</div>
      <div className="text-sm text-gray-400">{userData.account}</div>
    </div>
  );
};

export default MyProfile;
