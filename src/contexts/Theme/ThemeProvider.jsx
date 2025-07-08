import { ThemeContext } from "./ThemeContext";
import { useTheme } from "../../hooks/useTheme";

export const ThemeProvider = ({ children }) => {
  const { theme } = useTheme();

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};
