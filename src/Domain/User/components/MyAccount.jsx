import shinhan from "../../../assets/trade/shinhan.png";

const MyAccount = ({ evaluationAmount, profit, profitRate, accountData }) => {
  const profitColor =
    profit >= 0
      ? "text-red-500"
      : profit < 0
      ? "text-blue-500"
      : "text-gray-500";

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">나의 주식</h2>

      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex items-center space-x-3">
          <img src={shinhan} className="h-[38px] w-auto" alt="은행 로고" />
          <div>
            <p className="font-bold text-md">계좌</p>
            <p className="text-gray-500 font-light">
              {accountData.accountNumber}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">평가금액</p>
          <p className="text-xl font-bold">
            {Math.round(evaluationAmount).toLocaleString()}원
          </p>
          <p className={`text-sm font-medium ${profitColor}`}>
            {profit > 0 ? "+" : ""}
            {Math.round(profit).toLocaleString()} ({profitRate}%)
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-500 text-sm">투자가능금액</p>
          <p className="font-bold">
            {accountData.availableAmount.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
