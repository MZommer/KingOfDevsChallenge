import { createContext, useContext, useState, useEffect } from "react";
export const LIGHT = "light";
export const DARK = "dark";
export const DEFAULT_THEME = LIGHT;

const ThemeContext = createContext();

const getThemeFromLocalStorage = () =>
  localStorage.getItem("theme") || DEFAULT_THEME;

export function ThemeProvider({ children }) {
  const [themeState, setTheme] = useState(getThemeFromLocalStorage());
  const toggleTheme = () => setTheme((curr) => (curr === LIGHT ? DARK : LIGHT));
  const setThemeTitle = () => {
    document.title = `| ${themeState} theme |`;
  };
  useEffect(() => setThemeTitle());
  // save theme on local storage every time the value updates
  useEffect(() => localStorage.setItem("theme", themeState), [themeState]);
  return (
    <ThemeContext.Provider
      value={{ theme: themeState, toggleTheme, setThemeTitle }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
