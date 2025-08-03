import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./App.css";
import { askGroq, generateChatTitle } from "./chatUtils";

const App = () => {
  const [sessions, setSessions] = useState(() => {
    return JSON.parse(localStorage.getItem("chatSessions")) || [
      {
        id: Date.now(),
        title: "New Chat",
        messages: [{ role: "assistant", content: "How can I help you today?" }],
      },
    ]; 
  });
  
  const [currentSessionId, setCurrentSessionId] = useState(sessions[0].id);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
  }, [sessions]);

  const sendMessage = async (file = null) => {
    if (!input.trim() && !file) return;
    let newMessage = { role: "user", content: input };

    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        await new Promise((resolve) => {
          reader.onload = () => {
            newMessage = {
              ...newMessage,
              file: { type: "image", data: reader.result, name: file.name },
            };
            resolve();
          };
        });
      } else {
        newMessage = {
          ...newMessage,
          file: { type: "other", name: file.name },
        };
      }
    }

    const updatedMessages = [...currentSession.messages, newMessage];
    setLoading(true);
    setError(null);
    setInput("");

    try {
      const reply = await askGroq(updatedMessages);
      const newMessages = [...updatedMessages, { role: "assistant", content: reply }];

      let updatedSessions = sessions.map((session) =>
        session.id === currentSessionId ? { ...session, messages: newMessages } : session
      );

      if (currentSession.messages.filter((m) => m.role === "user").length === 0 && input) {
        const title = await generateChatTitle(input);
        updatedSessions = updatedSessions.map((session) =>
          session.id === currentSessionId ? { ...session, title } : session
        );
      }

      setSessions(updatedSessions);
    } catch (err) {
      setError(err.message || "Failed to get response from the server.");
      setSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId ? { ...session, messages: updatedMessages } : session
        )
      );
    }
    setLoading(false);
  };

  const handleFileUpload = (file) => {
    sendMessage(file);
  };

  const newChat = () => {
    const chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [{ role: "assistant", content: "How can I help you today?" }],
    };
    setSessions([chat, ...sessions]);
    setCurrentSessionId(chat.id);
    setError(null);
  };

  const selectChat = (id) => {
    setCurrentSessionId(id);
    setError(null);
  };

  const deleteChat = (id) => {
    console.log("Deleting chat with ID:", id);
    const updatedSessions = sessions.filter((s) => s.id !== id);
    console.log("Updated sessions:", updatedSessions);
    setSessions(updatedSessions);
    if (currentSessionId === id) {
      if (updatedSessions.length > 0) {
        setCurrentSessionId(updatedSessions[0].id);
      } else {
        newChat();
      }
    }
  };

  const renameChat = (id, newTitle) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, title: newTitle || "New Chat" } : session
      )
    );
  };

  return (
    <div className="app-container">
      <Sidebar
        sessions={sessions}
        onNewChat={newChat}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
        onRenameChat={renameChat}
        currentId={currentSessionId}
      />
      <Chat
        messages={currentSession.messages}
        onSend={sendMessage}
        onFileUpload={handleFileUpload}
        input={input}
        setInput={setInput}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default App;