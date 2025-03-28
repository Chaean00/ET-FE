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
import Footer from "./common/components/Footer";
import useAuth from "./hooks/useAuth";
import { useLocation } from "react-router-dom";

const publicRoutes = [
  { path: "/login", element: <LogInPage /> },
  { path: "/signup", element: <SignUpPage /> },
];

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
  { path: "/ChatbotPage", element: <ChatbotPage /> },
];

function AppContent() {
  const { token } = useAuth();

  return (
    <div id="frame">
      {token && <Alert />}
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<PublicRoute />}>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

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
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="w-full max-w-[375px] h-screen mx-auto relative overflow-x-hidden">
      <AuthProvider>
        <div className="flex-grow overflow-y-auto">
          <AppContent />
        </div>
        {pathname === "/" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/ChatbotPage" ? null : (
          <Footer />
        )}
      </AuthProvider>
    </div>
  );
}

export default App;
