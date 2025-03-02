import { useNavigate, useLocation } from "react-router-dom";

import Home from "../../assets/tradetown/home.svg?react";
import Quiz from "../../assets/tradetown/quiz.svg?react";
import Trade from "../../assets/tradetown/trade.svg?react";
import MyPage from "../../assets/tradetown/mypage.svg?react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const icons = [
    { name: "home", component: Home, path: "/town" },
    { name: "quiz", component: Quiz, path: "/quiz" },
    { name: "trade", component: Trade, path: "/trade" },
    { name: "mypage", component: MyPage, path: "/mypage" },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-300">
      <div className="flex justify-around py-4">
        {icons.map((icon) => {
          const IconComponent = icon.component;
          const isActive = location.pathname === icon.path;

          return (
            <button
              key={icon.name}
              onClick={() => navigate(icon.path)}
              className="cursor-pointer flex flex-col items-center focus:outline-none"
            >
              <IconComponent
                className={`w-6.2 h-6.2 ${
                  isActive ? "text-blue-500" : "text-gray-500"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
