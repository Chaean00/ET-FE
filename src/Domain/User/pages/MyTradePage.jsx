import MyTrade from "../components/MyTrade";
import Footer from "../../../common/components/Footer";

const MyTradePage = () => {
  return (
    <div>
      <div className="font-bold text-2xl">거래 내역</div>
      <div>
        <MyTrade />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default MyTradePage;
