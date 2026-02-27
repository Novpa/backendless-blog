interface ButtonProps {
  onClick?: () => void;
  style?: string;
  type: "submit" | "reset" | "button";
  children: React.ReactNode;
  disabled?: boolean;
}

function Button({
  onClick,
  style = "primary",
  type,
  children,
  disabled = false,
}: ButtonProps) {
  type StyleOptions = {
    [key: string]: string;
  };

  const styleOptions: StyleOptions = {
    primary: `px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-normal ${disabled ? "bg-indigo-200" : "bg-indigo-500"} text-stone-50 tracking-widest ${disabled ? "hover: bg-indigo-200" : "hover:bg-indigo-600"} transition-all duration-300 font-light rounded-md ${disabled ? "cursor-no-drop" : "cursor-pointer"}`,
    secondary:
      "px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-normal bg-black hover:bg-white hover:border-black text-white hover:text-stone-900 tracking-widest  border border-stone-50 transition-all duration-300 font-light rounded-md cursor-pointer",
  };
  // className={styleOptions[style]}
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={styleOptions[style]}>
      {children}
    </button>
  );
}
export default Button;
