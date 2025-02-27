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
import TradeMainPage from "./Domain/Trade/pages/TradeMainPage";
import MyPageMain from "./Domain/User/pages/MyPageMain";

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
        <Route path="/trade" element={<TradeMainPage />} />
        <Route path="/mypage" element={<MyPageMain />} />
      </Routes>
    </div>
  );
}

export default App;
