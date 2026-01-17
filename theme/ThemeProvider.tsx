import { useAppTheme } from "@/hooks/useAppTheme";
import React, { createContext, useContext } from "react";
import { darkTheme, lightTheme } from "./themes";

const ThemeContext = createContext(lightTheme);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useAppTheme();

  const value = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
