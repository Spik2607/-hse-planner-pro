import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`bg-white shadow rounded ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return <div className={`px-6 py-4 border-b font-semibold ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
