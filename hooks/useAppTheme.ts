import { useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";

type ThemeMode = "light" | "dark";

export function useAppTheme() {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(
    systemScheme === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    if (systemScheme) {
      setTheme(systemScheme === "dark" ? "dark" : "light");
    }
  }, [systemScheme]);

  const setAppTheme = (mode: ThemeMode) => {
    setTheme(mode);
    Appearance.setColorScheme(mode);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setAppTheme(nextTheme);
  };

  return {
    theme,
    isDarkMode: theme === "dark",
    setAppTheme,
    toggleTheme,
  };
}
