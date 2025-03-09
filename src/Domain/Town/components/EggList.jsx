import { useEffect, useState } from "react";
import ShakingEgg from "./ShakingEgg";

const EggList = ({ eggs = [], onHatchEgg }) => {
  const [eggTimers, setEggTimers] = useState([]);

  useEffect(() => {
    if (eggs.length > 0) {
      setEggTimers(
        eggs.map((egg) => ({
          ...egg,
          timeRemaining: convertTimeStringToSeconds(egg.timeRemaining),
          isHatched: egg.timeRemaining === "00:00:00",
        }))
      );
    }
  }, [eggs]);

  useEffect(() => {
    const timer = setInterval(() => {
      setEggTimers((prevEggs) =>
        prevEggs.map((egg) => {
          if (egg.timeRemaining > 0) {
            return { ...egg, timeRemaining: egg.timeRemaining - 1 };
          }
          return { ...egg, isHatched: true };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-16 w-full max-w-md mx-auto place-items-center">
      {eggTimers.length === 0 ? (
        <p className="text-gray-500 text-center w-full">아직 알이 없습니다.</p>
      ) : (
        eggTimers.map((egg) => (
          <div
            key={egg.eggId}
            className={`w-23 h-23 flex flex-col justify-center items-center ${
              egg.isHatched ? "cursor-pointer" : ""
            }`}
            onClick={() => egg.isHatched && onHatchEgg(egg)}
          >
            <div className="flex-grow flex justify-center items-center w-full h-full">
              <ShakingEgg />
            </div>
            <p className="text-base font-bold">
              {egg.isHatched ? "부화 완료!" : formatTime(egg.timeRemaining)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

const convertTimeStringToSeconds = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const formatTime = (seconds) => {
  if (seconds <= 0) return "00:00:00";
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export default EggList;
