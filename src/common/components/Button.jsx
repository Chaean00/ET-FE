const Button = ({
  variant = "medium",
  color = "#3B82F6",
  children,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    large: "w-[325px] rounded-[20px] font-semibold",
    medium: "w-[150px] rounded-[12px]",
    small: "w-[100px] rounded-[8px]",
  };

  return (
    <button
      className={`text-white p-2 cursor-pointer ${sizeClasses[variant]} ${className}`}
      style={{ backgroundColor: color }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
