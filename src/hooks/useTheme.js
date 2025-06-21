import { useEffect } from "react";
import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  if (!theme) {
    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light"
    );
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  })

  return {
    theme,
    toggleTheme,
  };
};
