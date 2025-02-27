const CustomInput = ({ children, ...inputProps }) => {
  return (
    <div className="w-[90%] m-2">
      <div>
        <label className="text-[15px] font-bold">{children}</label>
      </div>
      <input
        {...inputProps}
        className="mt-1 w-full p-2 border border-blue-500 rounded-lg"
      />
    </div>
  );
};

export default CustomInput;
