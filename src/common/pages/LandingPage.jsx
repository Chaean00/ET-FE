import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import landingLogo from "../../assets/tradetown/landinglogo.png";
import FloatingEggs from "../components/FloatingEggs";
import LandingCharacters from "../components/LandingCharacters";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5600);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      id="landing"
      className="overflow-hidden custom-cursor flex justify-center items-center h-screen overflow-hidden"
      onClick={() => navigate("/login")}
    >
      <img
        src={landingLogo}
        alt="Landing Logo"
        className="w-1/2 max-w-xs mb-60 scale-115"
      />
      <FloatingEggs />
      <LandingCharacters />
    </div>
  );
};

export default LandingPage;
