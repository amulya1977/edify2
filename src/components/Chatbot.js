





import { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css"; // Import CSS for styling

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const GEMINI_API_KEY = "AIzaSyBsHuTaove2OZ9rZ70l338pHXdCUbJCfOs"; // Replace with your actual API key

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: input }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = { role: "bot", text: response.data.candidates[0].content.parts[0].text };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Sorry, something went wrong!" }]);
    }

    setInput("");
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button */}
      <button className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
        <img src="/robot.png" alt="Chatbot" />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>EdifyBot</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
