export default function Header({ darkMode, setDarkMode }) {
    return (
      <div style={{ flexShrink: 0,marginTop:10 ,paddingTop:3}}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            margin:20,
            marginLeft: 10,
            padding: "5px 10px",
            borderRadius: 5,
            backgroundColor: darkMode ? "#222" : "#eee",
            color: darkMode ? "#fff" : "#000",
            border: "1px solid",
            borderColor: darkMode ? "#555" : "#ccc",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <h1 style={{ textAlign: "center" }}>🤖 Groq AI Assistant</h1>
      </div>
    );
  }
  