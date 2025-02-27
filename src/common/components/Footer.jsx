import Home from "../../assets/tradetown/home.svg?react";
import Quiz from "../../assets/tradetown/quiz.svg?react";
import Trade from "../../assets/tradetown/trade.svg?react";
import MyPage from "../../assets/tradetown/mypage.svg?react";
import { useState } from "react";

const Footer = () => {
  const icons = [
    { name: "home", component: Home },
    { name: "quiz", component: Quiz },
    { name: "trade", component: Trade },
    { name: "mypage", component: MyPage },
  ];

  const [selectedIcon, setSelectedIcon] = useState("home");

  return (
    <div className="fixed bottom-0 w-full bg-white border-none">
      <div className="flex justify-around py-4">
        {icons.map((icon) => {
          const IconComponent = icon.component;

          return (
            <button
              key={icon.name}
              onClick={() => setSelectedIcon(icon.name)}
              className="flex items-center focus:ouline-none"
            >
              <IconComponent
                className={`w-6 h-6 ${
                  selectedIcon === icon.name ? "text-blue-500" : "text-gray-500"
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
