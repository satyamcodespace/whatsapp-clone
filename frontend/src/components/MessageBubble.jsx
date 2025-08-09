// frontend/src/components/MessageBubble.jsx
import React from 'react';
import { format } from 'date-fns';

const MessageBubble = ({ message }) => {
  // For this simulation, we'll assume the business number is '918329446654'
  // to determine if the message is outgoing or incoming.
  const isOwnMessage = message.from_number === '918329446654';

  return (
    <div className={`message-bubble-container ${isOwnMessage ? 'own-message' : 'other-message'}`}>
      <div className="message-bubble">
        <div className="message-body">{message.body}</div>
        <div className="message-meta">
          <span className="message-timestamp">{format(new Date(message.timestamp), 'p')}</span>
          {isOwnMessage && <span className="message-status">{message.status}</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;