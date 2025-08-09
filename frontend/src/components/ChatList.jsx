// frontend/src/components/ChatList.jsx
import React from 'react';

// This is now a "dumb" component that just displays what it's given
const ChatList = ({ conversations, onSelectConversation, selectedConversation }) => {
  return (
    <div className="chat-list">
      {conversations.map((convo) => (
        <div
          key={convo._id}
          // Add the 'active' class if this is the selected conversation
          className={`chat-list-item ${selectedConversation?._id === convo._id ? 'active' : ''}`}
          // On click, call the function passed from HomePage
          onClick={() => onSelectConversation(convo)}
        >
          <div className="chat-info">
            <h3>{convo.name}</h3>
            <p>{convo.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;