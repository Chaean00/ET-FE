import { useEffect, useState, useRef } from "react";
import ShakingEgg from "./ShakingEgg";

const EggList = ({ eggs = [], onHatchEgg }) => {
  const [eggTimers, setEggTimers] = useState([]);
  const eggTimeRefs = useRef({});
  const timersRef = useRef(null);

  useEffect(() => {
    setEggTimers((prevEggs) => {
      const newEggs = eggs.map((egg) => {
        if (eggTimeRefs.current[egg.eggId] === undefined) {
          eggTimeRefs.current[egg.eggId] = convertTimeStringToSeconds(
            egg.timeRemaining
          );
        }
        return {
          ...egg,
          timeRemaining: eggTimeRefs.current[egg.eggId],
          isHatched: eggTimeRefs.current[egg.eggId] === 0,
        };
      });

      return newEggs;
    });
  }, [eggs]);

  useEffect(() => {
    if (!timersRef.current) {
      timersRef.current = setInterval(() => {
        setEggTimers((prevEggs) =>
          prevEggs.map((egg) => {
            if (eggTimeRefs.current[egg.eggId] > 0) {
              eggTimeRefs.current[egg.eggId] -= 1;
              return {
                ...egg,
                timeRemaining: eggTimeRefs.current[egg.eggId],
                isHatched: eggTimeRefs.current[egg.eggId] === 0,
              };
            }
            return egg;
          })
        );
      }, 1000);
    }

    return () => {
      clearInterval(timersRef.current);
      timersRef.current = null;
    };
  }, []);

  const handleEggClick = (egg) => {
    if (egg.isHatched) {
      onHatchEgg(egg);
      setEggTimers((prevEggs) => prevEggs.filter((e) => e.eggId !== egg.eggId));
      delete eggTimeRefs.current[egg.eggId];
    }
  };

  if (eggTimers.length === 0) {
    return (
      <div className="mt-[10em] flex justify-center items-center h-full w-full">
        <p className="text-gray-700 text-center text-lg">아직 알이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-16 w-full max-w-md mx-auto place-items-center">
      {eggTimers.map((egg) => (
        <div
          key={egg.eggId}
          className={`w-23 h-23 flex flex-col justify-center items-center ${
            egg.isHatched ? "cursor-pointer" : ""
          }`}
          onClick={() => handleEggClick(egg)}
        >
          <div className="flex-grow flex justify-center items-center w-full h-full">
            <ShakingEgg />
          </div>
          <p className="text-base font-bold">
            {egg.isHatched ? "부화 완료!" : formatTime(egg.timeRemaining)}
          </p>
        </div>
      ))}
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
