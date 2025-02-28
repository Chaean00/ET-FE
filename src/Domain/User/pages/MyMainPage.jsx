import SectionName from "../../../common/components/SectionName";
import MyProfile from "../components/MyProfile";
import MyCategory from "../components/MyCategory";
import Footer from "../../../common/components/Footer";

const MyMainPage = () => {
  return (
    <div className="">
      <div className="font-bold text-2xl">마이페이지</div>
      <MyProfile name="이나민" username="nm0922" />
      <div>
        <MyCategory />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default MyMainPage;
