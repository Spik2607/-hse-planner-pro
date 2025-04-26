import React from "react";

export function Button({ children, className = "", variant, size, ...props }) {
  const base = "px-4 py-2 rounded font-medium";
  const variants = {
    outline: "border border-gray-400 text-gray-700 bg-white hover:bg-gray-100",
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  };
  const sizes = {
    sm: "text-sm px-2 py-1",
    lg: "text-lg px-5 py-3"
  };
  const cls = [base, variants[variant] || "", sizes[size] || "", className].join(" ");
  return <button className={cls} {...props}>{children}</button>;
}
