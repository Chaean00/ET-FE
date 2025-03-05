import { Routes, Route } from "react-router-dom";
import LandingPage from "./common/pages/LandingPage";
import LogInPage from "./common/pages/LoginPage";
import SignUpPage from "./common/pages/SignUpPage";
import TownMainPage from "./Domain/Town/pages/TownMainPage";
import DogamPage from "./Domain/Town/pages/DogamPage";
import EggListPage from "./Domain/Town/pages/EggListPage";
import DrawPage from "./Domain/Town/pages/DrawPage";
import FriendPage from "./Domain/Town/pages/FriendPage";
import FriendTownPage from "./Domain/Town/pages/FriendTownPage";
import QuizMainPage from "./Domain/Quiz/pages/QuizMainPage";
import TodayQuizPage from "./Domain/Quiz/pages/TodayQuizPage";
import QuizDonePage from "./Domain/Quiz/pages/QuizDonePage";
import TradeMainPage from "./Domain/Trade/pages/TradeMainPage";
import MyMainPage from "./Domain/User/pages/MyMainPage";
import MyStockPage from "./Domain/User/pages/MyStockPage";
import MyTradePage from "./Domain/User/pages/MyTradePage";
import OrderBookPage from "./Domain/Trade/pages/OrderBookPage";
import StockPage from "./Domain/Trade/pages/StockPage";
import StockTradePage from "./Domain/Trade/pages/StockTradePage";
import ChatbotPage from "./Domain/Quiz/pages/ChatbotPage";

function App() {
  return (
    <div id="frame">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/town" element={<TownMainPage />} />
        <Route path="/dogam" element={<DogamPage />} />
        <Route path="/egglist" element={<EggListPage />} />
        <Route path="/draw" element={<DrawPage />} />
        <Route path="/friend" element={<FriendPage />} />
        <Route path="/friendtown" element={<FriendTownPage />} />
        <Route path="/quiz" element={<QuizMainPage />} />
        <Route path="/todayquiz" element={<TodayQuizPage />} />
        <Route path="/quizdone" element={<QuizDonePage />} />
        <Route path="/trade" element={<TradeMainPage />} />
        <Route path="/mypage" element={<MyMainPage />} />
        <Route path="/mystock" element={<MyStockPage />} />
        <Route path="/mytrade" element={<MyTradePage />} />
        <Route path="/orderbook" element={<OrderBookPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/stocktrade" element={<StockTradePage />} />
        <Route path="/ChatbotPage" element={<ChatbotPage />} />
      </Routes>
    </div>
  );
}

export default App;
