import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "success" | "danger" | "secondary";
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    secondary:
      "bg-slate-800 text-white border border-slate-600 hover:bg-slate-700",
  };

  return (
    <button
      className={`
        px-5
        py-3
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        hover:scale-105
        active:scale-95
        shadow-lg
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
