import { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  // find the theme value from the local storage if it exists.
  // If it doesn't exist, set it to light.
  let local_theme = localStorage.getItem('clockwork_theme');
  if (local_theme === null) {
    localStorage.setItem('clockwork_theme', 'business');
    local_theme = 'business';
  }
  const [theme, setContextTheme] = useState(local_theme);

  const setTheme = (theme) => {
    setContextTheme(theme);
    localStorage.setItem('clockwork_theme', theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
