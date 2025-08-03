import React, { useState } from "react";

const Sidebar = ({ sessions, onNewChat, onSelectChat, onDeleteChat, onRenameChat, currentId }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleRename = (id, title) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const handleRenameSubmit = (id) => {
    onRenameChat(id, editTitle);
    setEditingId(null);
    setEditTitle("");
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleRenameSubmit(id);
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditTitle("");
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    console.log("Delete button clicked for ID:", id);
    onDeleteChat(id);
  };

  return (
    <div className="sidebar">
      <button className="new-chat" onClick={onNewChat}>
        <span className="new-chat-icon">➕</span> New Chat
      </button>
      <ul className="session-list">
        {sessions.map((s) => (
          <li
            key={s.id}
            className={s.id === currentId ? "active" : ""}
            onClick={() => onSelectChat(s.id)}
          >
            {editingId === s.id ? (
              <input
                className="title-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, s.id)}
                onBlur={() => handleRenameSubmit(s.id)}
                autoFocus
              />
            ) : (
              <span onClick={() => handleRename(s.id, s.title)}>{s.title}</span>
            )}
            <button
              className="delete-btn"
              onClick={(e) => handleDelete(e, s.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;