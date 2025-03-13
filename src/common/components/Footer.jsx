import { useNavigate, useLocation } from "react-router-dom";

import Home from "../../assets/tradetown/home.svg?react";
import Quiz from "../../assets/tradetown/quiz.svg?react";
import Trade from "../../assets/tradetown/trade.svg?react";
import MyPage from "../../assets/tradetown/mypage.svg?react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePaths = {
    home: ["/town", "/dogam", "/egglist", "/draw", "/friend", "/friendtown"],
    quiz: ["/quiz", "/todayquiz", "/quizdone"],
    trade: ["/trade", "/stock", "/stocktrade", "/orderbook", "/chatbotpage"],
    mypage: ["/mypage", "/mystock", "/mytrade"]
  };

  const icons = [
    { name: "home", component: Home, paths: activePaths.home },
    { name: "quiz", component: Quiz, paths: activePaths.quiz },
    { name: "trade", component: Trade, paths: activePaths.trade },
    { name: "mypage", component: MyPage, paths: activePaths.mypage }
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-[375px] mx-auto bg-white border-t border-gray-300">
      <div className="flex justify-around py-4">
        {icons.map((icon) => {
          const IconComponent = icon.component;
          const isActive = icon.paths.includes(location.pathname);

          return (
            <button
              key={icon.name}
              onClick={() => navigate(icon.paths[0])}
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
