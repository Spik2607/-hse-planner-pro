import React from "react";

export function Calendar({ className = "", ...props }) {
  return <input type="date" className={`border rounded px-3 py-2 ${className}`} {...props} />;
}
