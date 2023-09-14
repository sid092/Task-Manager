import React from 'react'
import { useState ,useEffect } from 'react';

const ToggleDarkMode = () => {
    const [theme ,setTheme] = useState("light")
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default ToggleDarkMode
