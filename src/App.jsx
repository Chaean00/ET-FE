import { Routes, Route } from "react-router-dom";
import LandingPage from "./common/pages/LandingPage";
import LogInPage from "./common/pages/LogInPage";
import SignUpPage from "./common/pages/SignUpPage";
import Alert from "./common/pages/Alert";
import TownMainPage from "./Domain/Town/pages/TownMainPage";
import DogamPage from "./Domain/Town/pages/DogamPage";
import EggListPage from "./Domain/Town/pages/EggListPage";
import DrawPage from "./Domain/Town/pages/DrawPage";
import FriendPage from "./Domain/Town/pages/FriendPage";
import FriendTownPage from "./Domain/Town/pages/FriendTownPage";
import QuizPage from "./Domain/Quiz/pages/QuizPage";
import TodayQuizPage from "./Domain/Quiz/pages/TodayQuizPage";
import TradeMainPage from "./Domain/Trade/pages/TradeMainPage";
import MyMainPage from "./Domain/User/pages/MyMainPage";
import MyStockPage from "./Domain/User/pages/MyStockPage";
import MyTradePage from "./Domain/User/pages/MyTradePage";
import OrderBookPage from "./Domain/Trade/pages/OrderBookPage";
import StockPage from "./Domain/Trade/pages/StockPage";
import StockTradePage from "./Domain/Trade/pages/StockTradePage";
import ChatbotPage from "./Domain/Quiz/pages/ChatbotPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "./RouteGuards";
import useAuth from "./hooks/useAuth";

// public(비로그인) 사용자 전용 경로
const publicRoutes = [
  { path: "/login", element: <LogInPage /> },
  { path: "/signup", element: <SignUpPage /> }
];

// 로그인한 사용자 전용 경로
const protectedRoutes = [
  { path: "/town", element: <TownMainPage /> },
  { path: "/dogam", element: <DogamPage /> },
  { path: "/egglist", element: <EggListPage /> },
  { path: "/draw", element: <DrawPage /> },
  { path: "/friend", element: <FriendPage /> },
  { path: "/friendtown", element: <FriendTownPage /> },
  { path: "/quiz", element: <QuizPage /> },
  { path: "/todayquiz", element: <TodayQuizPage /> },
  { path: "/trade", element: <TradeMainPage /> },
  { path: "/mypage", element: <MyMainPage /> },
  { path: "/mystock", element: <MyStockPage /> },
  { path: "/mytrade", element: <MyTradePage /> },
  { path: "/orderbook", element: <OrderBookPage /> },
  { path: "/stock", element: <StockPage /> },
  { path: "/stocktrade", element: <StockTradePage /> },
  { path: "/ChatbotPage", element: <ChatbotPage /> }
];

function AppContent() {
  const { token } = useAuth();

  return (
    <div id="frame">
      {token && <Alert />}
      <Routes>
        {/* 누구나 접근 가능한 기본 페이지 */}
        <Route path="/" element={<LandingPage />} />

        {/* 로그인하지 않은 사용자 전용 라우트 */}
        <Route element={<PublicRoute />}>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* 로그인한 사용자 전용 라우트 */}
        <Route element={<ProtectedRoute />}>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
