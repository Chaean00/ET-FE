import { Routes, Route } from "react-router-dom";
import LandingPage from "./common/pages/LandingPage";
import LogInPage from "./common/pages/LoginPage";
import SignUpPage from "./common/pages/SignUpPage";
import TownMainPage from "./Domain/Town/pages/TownMainPage";

function App() {
  return (
    <div id="frame">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/town" element={<TownMainPage />} />
      </Routes>
    </div>
  );
}

export default App;
