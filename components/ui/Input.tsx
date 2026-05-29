import { InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`border border-gray-300 p-3 rounded-xl w-full text-black focus:outline-none focus:ring-2 focus:ring-black ${className}`}
      {...props}
    />
  );
}
