import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    if (text.trim()) {
      onSendMessage(text.trim());
      setText(''); // Clear the input field
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="message-input"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default MessageInput;