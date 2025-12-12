import React from "react";
import { Toaster } from "react-hot-toast";

function ReusabilityToast({
  position = "bottom-right",
  duration = 3000,
  theme = "system",
  ...props
}) {
  const prefersDark =
    theme === "system"
      ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      : theme === "dark";

  const baseStyle = {
    borderRadius: "10px",
    padding: "10px",
    background: prefersDark ? "#343a40" : "#ffffff",
    color: prefersDark ? "#ffffff" : "#000000",
    fontSize: "0.9rem",
    boxShadow: prefersDark
      ? "0 2px 8px rgba(255, 255, 255, 0.1)"
      : "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Toaster
      position={position}
      toastOptions={{
        duration,
        style: baseStyle,
        success: { icon: "✅" },
        error: { icon: "❌" },
        info: { icon: "ℹ️" },
        loading: { icon: "⏳" },
      }}
      {...props}
    />
  );
}
export default ReusabilityToast;
