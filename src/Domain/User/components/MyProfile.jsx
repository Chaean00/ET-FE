const MyProfile = ({ name, username }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-xs">
      <div className="text-lg font-bold text-black">{name}</div>
      <div className="text-xs text-gray-400">{username}</div>
    </div>
  );
};

export default MyProfile;
