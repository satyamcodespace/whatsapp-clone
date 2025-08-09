import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput'; 

const ChatWindow = ({ conversation, messages, loading, onSendMessage }) => {
  // Create a ref to track the end of the message list
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect to scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  if (!conversation) {
    return (
      <div className="chat-window placeholder">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{conversation.name}</h3>
      </div>
      <div className="message-area">
        {loading ? (
          <div className="loading-spinner">Loading messages...</div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg._id} message={msg} />)
        )}
        {/* Add a div at the end of the messages to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      {/* Add the MessageInput component and pass the onSendMessage function */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;