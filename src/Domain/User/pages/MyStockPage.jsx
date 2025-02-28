import MyChart from "../components/MyChart";
import MyTable from "../components/MyTable";
import Footer from "../../../common/components/Footer";

const MyStockPage = () => {
  return (
    <div>
      <div className="font-bold text-2xl">보유 주식</div>
      <div>
        <MyChart />
      </div>
      <div>
        <MyTable />
      </div>

      <div className="text-sm bg-white shadow-md rounded-xl p-4 w-full max-w-xs">
        <span className="font-bold">이나민</span> 님의 보유 포인트🏅는
        <span className="font-bold"> 20,000P</span>입니다.
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};
export default MyStockPage;
