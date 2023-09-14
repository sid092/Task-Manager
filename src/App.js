import { useState ,useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import React from 'react'

function App() {
  const [theme ,setTheme] = useState("light")
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    localStorage.setItem("theme",JSON.stringify(theme))
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <div className={`App ${theme}`}>
      {theme==="dark"?
     <button className='btn' onClick={toggleTheme}>LightMode</button> 
     :<button className='btn' onClick={toggleTheme}>DarkMode</button>}
      
      <Todo/>
    </div>
  );
}

export default App;
