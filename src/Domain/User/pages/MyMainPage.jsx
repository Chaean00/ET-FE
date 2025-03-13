import MyProfile from "../components/MyProfile";
import MyCategory from "../components/MyCategory";
import MyLogOutBtn from "../components/MyLogOutBtn";

const MyMainPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="w-[90%] max-w-md flex-grow">
        <div className="flex justify-between items-center mt-3">
          <h1 className="font-bold text-2xl">마이페이지</h1>
          <MyLogOutBtn />
        </div>

        <MyProfile name="이나민" username="nm0922" />
        <div className="mt-2">
          <MyCategory />
        </div>
      </div>
    </div>
  );
};

export default MyMainPage;
