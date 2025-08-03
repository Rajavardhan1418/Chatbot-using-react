import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const Chat = ({ messages, onSend, onFileUpload, input, setInput, loading, error }) => {
  const chatEndRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSend();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
      e.target.value = null; // Reset input
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="bubble">
              {msg.file ? (
                <>
                  {msg.file.type === "image" ? (
                    <img
                      src={msg.file.data}
                      alt={msg.file.name}
                      style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                  ) : (
                    <span>File: {msg.file.name}</span>
                  )}
                  {msg.content && <ReactMarkdown>{msg.content}</ReactMarkdown>}
                </>
              ) : (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="bubble">Typing...</div>
          </div>
        )}
        {error && (
          <div className="message assistant">
            <div className="bubble" style={{ color: "#f87171" }}>
              Error: {error}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <button
          className="file-upload-btn"
          onClick={() => fileInputRef.current.click()}
          title="Upload file"
        >
          📎
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*,.pdf,.txt,.doc,.docx"
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={() => onSend()}>➤</button>
      </div>
    </div>
  );
};

export default Chat;