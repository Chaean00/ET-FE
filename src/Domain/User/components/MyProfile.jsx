const MyProfile = ({ name, username }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-xl px-4 py-8 max-w-sm">
      <div className="text-xl font-bold text-black">{name}</div>
      <div className="text-xs text-gray-400">{username}</div>
    </div>
  );
};

export default MyProfile;
