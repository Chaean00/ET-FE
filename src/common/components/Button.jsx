const Button = ({
  variant = "medium",
  color = "#3B82F6",
  children,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    large: "w-[320px] rounded-[20px] text-md",
    medium: "w-[165px] rounded-[50px]",
    small: "w-[100px] rounded-[8px]",
  };

  return (
    <button
      className={`text-white p-2.5 cursor-pointer ${sizeClasses[variant]} ${className}`}
      style={{ backgroundColor: color }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
