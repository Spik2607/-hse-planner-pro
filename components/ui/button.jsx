import React from "react";

export function Button({ children, className = "", variant = "solid", size = "md", ...props }) {
  const base = "rounded font-semibold transition";
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  };
  const sizes = {
    sm: "text-sm px-2 py-1",
    md: "text-md px-4 py-2",
    lg: "text-lg px-6 py-3"
  };

  const classes = `${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
