import React, { createContext, useContext, useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
});

/** PUBLIC_INTERFACE
 * ThemeProvider supplies theme state and applies document-level attributes.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Hook to access theme state */
  return useContext(ThemeContext);
}
