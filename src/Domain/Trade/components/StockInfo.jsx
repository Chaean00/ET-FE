import korea from "../../../assets/tradetown/korea.jpg";

const StockInfo = ({ stockCode, companyName, price }) => {
  return (
    <div className="items-center space-y-1">
      <div className="flex text-gray-600 text-md">
        {stockCode}

        <img className="ml-1 h-[20px]" src={korea} />
      </div>
      <div>
        <span className="text-2xl font-bold">{companyName}</span>
      </div>
      <div className="text-black text-2xl font-bold">
        {price.toLocaleString()}원
      </div>
    </div>
  );
};

export default StockInfo;
