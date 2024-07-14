import React, { useState } from "react";
import { chat } from "../assets";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); 

  const apiKeys = [
    "3a9f8d2b2bmsh1fade4dfd1a93a4p1978ebjsn8813412645b0",
    "b6ef6c9b33mshcf5bf49fef9b6c8p18d15bjsnea5b5c7bed1b",
  ];

  const sendMessage = async () => {
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    try {
      let secondBotResponse;
      let successfulResponse = false;

      for (const apiKey of apiKeys) {
        try {
          const secondBotOptions = {
            method: "POST",
            url: "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2",
            headers: {
              "x-rapidapi-key": apiKey,
              "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
              "Content-Type": "application/json",
            },
            data: {
              messages: [
                {
                  role: "user",
                  content: input,
                },
              ],
              system_prompt: "",
              temperature: 0.9,
              top_k: 5,
              top_p: 0.9,
              max_tokens: 256,
              web_access: false,
            },
          };

          secondBotResponse = await axios.request(secondBotOptions);
          successfulResponse = true;
          break;
        } catch (error) {
          console.error(`Error with API key ${apiKey}:`, error);
        }
      }

      if (successfulResponse) {
        const cleanedText = secondBotResponse.data.result.replace(
          /({|}|result|,|status|server_code|:|true|1)/g,
          ""
        );
        const secondBotMessage = {
          sender: "secondBot",
          text: cleanedText.trim(),
        };

        console.log("Second Bot Response:", secondBotResponse.data);

        setMessages((prevMessages) => [...prevMessages, secondBotMessage]);
      } else {
        console.error("All API keys failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen); 
  };

  const closeChatbot = () => {
    setIsOpen(false); 
  };

  return (
    <>
      {isOpen && (
        <div className={`chatbot ${isOpen ? 'open' : ''}`}>
          <div className="navbar">
            <div className="title">How may I help you?</div>
            <div className="close-btn" onClick={closeChatbot}>
              <span>&times;</span>
            </div>
          </div>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      {!isOpen && (
        <img src={chat} alt="Chat Icon" className="chat-icon" onClick={toggleChatbot} />
      )}
    </>
  );
};

export default Chatbot;
