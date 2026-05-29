import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        bg-slate-900/80
        backdrop-blur-xl
        border border-slate-700
        rounded-3xl
        shadow-2xl
        p-5
        transition-all
        duration-300
        hover:border-orange-500/50
        hover:shadow-orange-500/10
        ${className}
      `}
    >
      {children}
    </div>
  );
}
