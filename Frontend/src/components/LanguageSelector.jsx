import React from "react";

export default function LanguageSelector({ selectedLanguage, setSelectedLanguage }) {
  const getLanguageName = (code) =>
    new Intl.DisplayNames(["en"], { type: "language" }).of(code);

  return (
    <div style={{ marginBottom: 20 }}>
      <label htmlFor="language-select" style={{ marginRight: 10 }}>
        🌐 Language:
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        style={{ padding: "5px 10px", borderRadius: 5 }}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="te">Telugu</option>
        <option value="ta">Tamil</option>
        <option value="bn">Bengali</option>
        <option value="fr">French</option>
        <option value="sp">spanish</option>
      </select>

      <span style={{ marginLeft: 15 }}>
        <b>{getLanguageName(selectedLanguage)}</b> ({selectedLanguage})
      </span>
    </div>
  );
}
