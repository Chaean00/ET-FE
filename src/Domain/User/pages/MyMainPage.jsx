import MyProfile from "../components/MyProfile";
import MyCategory from "../components/MyCategory";
import Footer from "../../../common/components/Footer";

const MyMainPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="w-[90%] max-w-md flex-grow">
        <h1 className="font-bold text-2xl mt-3 b-4">마이페이지</h1>
        <MyProfile name="이나민" username="nm0922" />
        <div className="mt-2">
          <MyCategory />
        </div>
      </div>

      <Footer className="absolute bottom-0 w-full max-w-md bg-white border-t" />
    </div>
  );
};

export default MyMainPage;
