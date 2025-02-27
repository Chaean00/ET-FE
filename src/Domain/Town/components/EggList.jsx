import ShakingEgg from "./ShakingEgg";

const EggList = () => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto place-items-center">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="w-24 h-24 flex flex-col justify-center items-center"
        >
          <div className="flex-grow flex justify-center items-center w-full h-full">
            <ShakingEgg />
          </div>
          <p className="text-base mt-1 font-bold">9시간11분</p>
        </div>
      ))}
    </div>
  );
};

export default EggList;
