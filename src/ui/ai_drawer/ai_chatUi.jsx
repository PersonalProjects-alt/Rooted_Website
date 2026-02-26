import React, { useState } from "react";
import "./ChatUI.css";
import { UserAuth } from '../../context/AuthContext.jsx'
import { motion } from "motion/react"

function ChatUI() {
    const { user, logOut } = UserAuth();
    const [messages, setMessages] = useState([
        { from: "assistant", text: `Hey ${user?.displayName} How can I help you today?` },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        const messageToSend = input.trim();
        if (!messageToSend) return;

        // 1) Add user message immediately
        setMessages(prev => [...prev, { from: "user", text: messageToSend }]);

        // 2) Add a temporary assistant message (optional but feels nice)
        setMessages(prev => [...prev, { from: "assistant", text: "Thinking..." }]);

        // 3) Clear input box
        setInput("");

        // 4) Call backend and replace "Typing..." with real response
        try {
            const replyText = await callAiProtectedRoute(messageToSend);

            setMessages(prev => {
                // replace the last assistant "Typing..." message
                const copy = [...prev];
                for (let i = copy.length - 1; i >= 0; i--) {
                    if (copy[i].from === "assistant" && copy[i].text === "Thinking...") {
                        copy[i] = { from: "assistant", text: replyText };
                        return copy;
                    }
                }
                // fallback if not found
                return [...copy, { from: "assistant", text: replyText }];
            });

        } catch (e) {
            setMessages(prev => {
                const copy = [...prev];
                // try to replace Typing...
                for (let i = copy.length - 1; i >= 0; i--) {
                    if (copy[i].from === "assistant" && copy[i].text === "Thinking...") {
                        copy[i] = { from: "assistant", text: "Something went wrong calling the AI." };
                        return copy;
                    }
                }
                return [...copy, { from: "assistant", text: "Something went wrong calling the AI." }];
            });
        }
    };

    //Protected Route for AI messages
    const callAiProtectedRoute = async (message) => {
        try {
            const token = await user.getIdToken();

            const res = await fetch("http://localhost:4000/api/chat", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            console.log("AI response", data);

            return data.reply;
        } catch (e) {
            console.error("Error calling AI protected route", e);
        }
    }


    return (
        <div className="chat-container">
            {/* Messages */}
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                        className={`chat-bubble ${msg.from === "user" ? "user" : "assistant"
                            }`}
                    >
                        {msg.text}
                    </motion.div>
                ))}
            </div>

            {/* Input */}
            <div>
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
        </div>
    );
}

export default ChatUI;
