import React from "react";

const Avatar = ({ sender }) => {
  return (
    <div className="avatar">
      {sender === "user" ? "👤" : "🤖"}
    </div>
  );
};

export default Avatar;
