import React, { useEffect, useState } from "react";
import { Switch } from 'antd';

const DarkModeToggle = () => {
   

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode);
//     document.body.className = darkMode ? "dark-mode" : "";
//   }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
