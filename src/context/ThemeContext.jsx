import { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  // find the theme value from the local storage if it exists.
  // If it doesn't exist, set it to light.
  let local_theme = localStorage.getItem('my_theme');
  if (local_theme === null) {
    localStorage.setItem('clockwork_theme', 'business');
    local_theme = 'business';
  }

  const [theme, setContextTheme] = useState(local_theme);

  const setTheme = (theme) => {
    if (theme === 'business') {
      setContextTheme('business');
      localStorage.setItem('clockwork_theme', 'business');
    } else if (theme === 'dracula') {
      setContextTheme('dracula');
      localStorage.setItem('clockwork_theme', 'dracula');
    } else if (theme === 'forest') {
      setContextTheme('forest');
      localStorage.setItem('clockwork_theme', 'forest');
    } else if (theme === 'corporate') {
      setContextTheme('corporate');
      localStorage.setItem('clockwork_theme', 'corporate');
    } else if (theme === 'wireframe') {
      setContextTheme('wireframe');
      localStorage.setItem('clockwork_theme', 'wireframe');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
