import React, { useState } from "react";
import "./ChatUI.css";

function ChatUI() {
  const [messages, setMessages] = useState([
    { from: "assistant", text: "Hey 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      { from: "user", text: input },
      { from: "assistant", text: "This is a placeholder response." }
    ]);

    setInput("");
  };

  return (
    <div className="chat-container">
      
      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.from === "user" ? "user" : "assistant"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input-wrapper">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-send">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatUI;
