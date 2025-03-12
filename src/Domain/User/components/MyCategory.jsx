import { useNavigate } from "react-router-dom";

const MyCategory = () => {
  const navigate = useNavigate();
  const categories = [
    { id: 1, title: "보유 주식" },
    { id: 2, title: "거래 내역" },
  ];

  return (
    <div className="w-full max-w-sm space-y-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white shadow-md rounded-xl px-4 py-6 w-full flex items-center justify-between cursor-pointer"
          onClick={() => {
            category.title == "보유 주식"
              ? navigate("/mystock")
              : navigate("/mytrade");
          }}
        >
          <span className="text-md font-semibold text-black">
            {category.title}
          </span>
          <span className="text-gray-700 text-lg">{">"}</span>
        </div>
      ))}
    </div>
  );
};

export default MyCategory;
