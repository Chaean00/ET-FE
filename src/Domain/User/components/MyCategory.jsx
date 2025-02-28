import { useNavigate } from "react-router-dom";

const MyCategory = () => {
  const navigate = useNavigate();
  const categories = [
    { id: 1, title: "보유 주식", onClick: () => console.log("보유 주식 클릭") },
    { id: 2, title: "거래 내역", onClick: () => console.log("관심 종목 클릭") },
  ];

  return (
    <div className="w-full max-w-xs space-y-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white shadow-md rounded-xl p-4 w-full flex items-center justify-between cursor-pointer"
          onClick={category.onClick}
        >
          <span className="text-md font-semibold text-black">
            {category.title}
          </span>
          <span
            className="text-gray-400 text-lg"
            onClick={() => {
              category.title == "보유 주식"
                ? navigate("/mystock")
                : navigate("/mytrade");
            }}
          >
            {">"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MyCategory;
