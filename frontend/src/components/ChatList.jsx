import React from 'react';

const ChatList = ({ conversations, onSelectConversation, selectedConversation }) => {
  return (
    <div className="chat-list">
      {conversations.map((convo) => (
        <div
          key={convo._id}
          className={`chat-list-item ${selectedConversation?._id === convo._id ? 'active' : ''}`}
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