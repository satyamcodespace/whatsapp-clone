import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
// Import postMessage and the other API functions
import { fetchConversations, fetchMessages, postMessage } from '../services/api';

const HomePage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Effect to fetch the initial list of conversations
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await fetchConversations();
        setConversations(response.data);
      } catch (error) {
        console.error('Failed to load conversations', error);
      }
    };
    loadConversations();
  }, []);

  // Effect to fetch messages when a conversation is selected
  useEffect(() => {
    if (!selectedConversation) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const response = await fetchMessages(selectedConversation._id);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to load messages', error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [selectedConversation]);

  // NEW: Function to handle sending a message
  const handleSendMessage = async (messageBody) => {
    if (!selectedConversation) return;

    // Instantly update the UI for a better user experience (optimistic update)
    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      body: messageBody,
      from_number: '918329446654', // The message is from the business
      timestamp: new Date().toISOString(),
      status: 'sending...',
    };
    setMessages((prevMessages) => [...prevMessages, optimisticMessage]);

    // Send the message to the backend
    try {
      const messageData = {
        conversation_id: selectedConversation._id,
        wa_id: selectedConversation.wa_id,
        name: selectedConversation.name,
        body: messageBody,
      };
      await postMessage(messageData);
      // In a more advanced app, you might replace the optimistic message
      // with the actual message returned from the server here.
    } catch (error) {
      console.error('Failed to send message', error);
      // You could add logic here to show the message failed to send.
    }
  };


  return (
    <div className="app-layout">
      <div className="sidebar">
        <div className="chat-list-header">
          <h2>Chats</h2>
        </div>
        <ChatList
          conversations={conversations}
          onSelectConversation={setSelectedConversation}
          selectedConversation={selectedConversation}
        />
      </div>
      <ChatWindow 
        conversation={selectedConversation}
        messages={messages}
        loading={loading}
        onSendMessage={handleSendMessage} // Pass the new function as a prop
      />
    </div>
  );
};

export default HomePage;