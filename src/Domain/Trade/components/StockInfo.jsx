import korea from "../../../assets/tradetown/korea.jpg";

const StockInfo = ({ stockCode, companyName }) => {
  return (
    <div className="items-center space-y-1">
      <div className="flex text-gray-600 text-md">
        {stockCode}
        <img className="ml-1 h-[20px]" src={korea} />
      </div>
      <div>
        <span className="text-3xl font-bold">{companyName}</span>
      </div>
      <div className="text-3xl font-bold">57,300원</div>
    </div>
  );
};

export default StockInfo;
